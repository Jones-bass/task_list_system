import { useEffect, useMemo, useState } from 'react';
import { FiTrash2, FiEdit2, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { api } from '../services/api';
import { AddList } from '../components/addList';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "../assets/Camada_x0020_1 (1).svg"
import { Container, TaskItem, TaskList } from './styled';
import { IconList } from '../components/IconList';
import { ConfirmModalDelete } from '../components/diolog';
import { toast } from 'react-toastify';

export interface Task {
  id: number;
  title: string;
  cost: number;
  deadline: string;
  order: number;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  async function loadTasks() {
    try {
      const response = await api.get<{ tasks: Task[] }>("/task");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
      toast.error("Erro ao carregar as tarefas. Tente novamente.");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

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

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

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

  const formatDateParts = useMemo(() => {
    return (dateStr: string) => {
      const date = new Date(dateStr);
      date.setHours(date.getHours() + date.getTimezoneOffset() / 60); // Ajuste de fuso horário

      if (isNaN(date.getTime())) {
        return { day: '--', month: '--', year: '--' };
      }

      const day = format(date, 'd', { locale: ptBR });
      const month = format(date, 'MMMM', { locale: ptBR });
      const year = format(date, 'yyyy', { locale: ptBR });

      return { day, month, year };
    };
  }, []);

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <AddList onAdd={loadTasks} editingTask={editingTask} onUpdate={handleUpdate} />
      <TaskList>
        {tasks.map(task => {
          const { day, month, year } = formatDateParts(task.deadline);

          return (
            <TaskItem key={task.id} $custo={task.cost}>
              <div className="task-info">
                <h1>{task.title}</h1>
                <p><strong>Custo:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(task.cost)}</p>
              </div>
              <div className="task-date">
                <p className="day">{day}</p>
                <p className="month">{month}</p>
                <p className="year">{year}</p>
              </div>
              <div className="actions">
                <button onClick={() => moveTaskUp(task.id)}>
                  <FiArrowUp />
                </button>
                <button onClick={() => moveTaskDown(task.id)}>
                  <FiArrowDown />
                </button>
                <button onClick={() => handleEdit(task)}>
                  <FiEdit2 />
                </button>
                <button className='trash' onClick={() => openDeleteModal(task)}>
                  <FiTrash2 />
                </button>
              </div>
            </TaskItem>
          );
        })}
      </TaskList>
      <div>{tasks.length === 0 && <IconList />}</div>

      <ConfirmModalDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        taskToDelete={taskToDelete}
        onConfirmDelete={confirmDelete}
      />
    </Container>
  );
}
