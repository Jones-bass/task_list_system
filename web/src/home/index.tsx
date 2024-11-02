import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { api } from '../services/api';
import { AddList } from '../components/addList';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "../assets/Camada_x0020_1 (1).svg"
import { Container, TaskItem, TaskList } from './styled';
import { IconList } from '../components/IconList';
import { Diolog } from '../components/diolog';
import { toast } from 'react-toastify';

export interface Task {
  id: number;
  nome: string;
  custo: number;
  dataLimite: string;
  ordem: number;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    api.get<Task[]>('/tarefas')
      .then(response => {
        const sortedTasks = response.data.sort((a, b) => {
          const dateA = new Date(a.dataLimite).getTime();
          const dateB = new Date(b.dataLimite).getTime();
          return dateA - dateB; 
        });
        setTasks(sortedTasks);
      })
      .catch(error => console.error('Error fetching tasks', error));
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      api.delete(`/tarefas/${taskToDelete.id}`)
        .then(() => {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
          closeDeleteModal();
          toast.success('Deletado com sucesso!');

        })
        .catch(error => {
          console.error('Erro ao excluir tarefa:', error);
          alert('Ocorreu um erro ao excluir a tarefa. Tente novamente.');
          closeDeleteModal();
        });
    }
  };


  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask: Task) => {
    api.put(`/tarefas/${updatedTask.id}`, updatedTask)
      .then(() => {
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ));
        setEditingTask(null);
      })
      .catch(error => {
        console.error('Erro ao atualizar tarefa:', error);
        alert('Ocorreu um erro ao atualizar a tarefa. Tente novamente.');
      });
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

  const formatDateParts = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return { day: '--', month: '--', year: '--' };
    }

    const day = format(date, 'd', { locale: ptBR });
    const month = format(date, 'MMMM', { locale: ptBR });
    const year = format(date, 'yyyy', { locale: ptBR });

    return { day, month, year };
  };

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <AddList onAdd={loadTasks} editingTask={editingTask} onUpdate={handleUpdate} />
      <TaskList>
        {tasks.map(task => {
          const { day, month, year } = formatDateParts(task.dataLimite);

          return (
            <TaskItem key={task.id} custo={task.custo}>
              <div className="task-info">
                <h1>{task.nome}</h1>
                <p><strong>Custo:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(task.custo)}</p>
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
      {/* Modal para confirmar exclusão */}
      <Diolog
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        taskToDelete={taskToDelete}
        onConfirmDelete={confirmDelete}
      />
    </Container>
  );
}
