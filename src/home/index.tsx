import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { api } from '../services/api';
import { AddList } from '../components/addList';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "../assets/Camada_x0020_1 (1).svg"
import { Container, TaskItem, TaskList } from './styled';
import { IconList } from '../components/IconList';

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

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    api.get<Task[]>('/tarefas')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      api.delete(`/tarefas/${id}`)
        .then(() => {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        })
        .catch(error => {
          console.error('Erro ao excluir tarefa:', error);
          alert('Ocorreu um erro ao excluir a tarefa. Tente novamente.');
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
      <AddList onAdd={loadTasks} editingTask={editingTask} onUpdate={handleUpdate}/>
      <TaskList>
        {tasks.map(task => {
          const { day, month, year } = formatDateParts(task.dataLimite);

          return (
            <TaskItem key={task.id} custo={task.custo}>
              <div className="task-info">
                <h1>{task.nome}</h1>
                <p><strong>Custo:</strong> R$ {task.custo}</p>
              </div>
              <div className="task-date">
                <p className="day">{day}</p>
                <p className="month">{month}</p>
                <p className="year">{year}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(task)}>
                  <FiEdit2 />
                </button>
                <button className='trash' onClick={() => handleDelete(task.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </TaskItem>
          );
        })}
      </TaskList>
      <div>{tasks.length === 0 && <IconList />}</div>
    </Container>
  );
}
