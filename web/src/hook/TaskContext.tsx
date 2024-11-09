import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';

export interface Task {
  id: number;
  title: string;
  cost: number;
  deadline: string;
  order: number;
}

interface TaskContextProps {
  tasks: Task[];
  handleUpdate: (updatedTask: Task) => void;
  loadTasks: () => Promise<void>;
  moveTaskUp: (id: number) => void;
  moveTaskDown: (id: number) => void;
  confirmDelete: () => Promise<void>;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
  editingTask: Task | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
  taskToDelete: Task | null;
  isDeleteModalOpen: boolean;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const response = await api.get<{ tasks: Task[] }>("/task");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
      toast.error("Erro ao carregar as tarefas. Tente novamente.");
    }
  }

  const handleUpdate = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const moveTaskUp = (id: number) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (id: number) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setDeleteModalOpen(false);
  };

  async function confirmDelete() {
    if (!taskToDelete) return;

    try {
      await api.delete(`/task/${taskToDelete.id}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
      toast.success('Deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      toast.error('Ocorreu um erro ao excluir a tarefa. Tente novamente.');
    } finally {
      closeDeleteModal();
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleUpdate,
        loadTasks,
        moveTaskUp,
        moveTaskDown,
        confirmDelete,
        openDeleteModal,
        closeDeleteModal,
        editingTask,
        setEditingTask,
        taskToDelete,
        isDeleteModalOpen,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
