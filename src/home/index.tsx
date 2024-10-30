import { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowDown, FiTrash2 } from 'react-icons/fi';
import { api } from '../services/api';
import { AddList } from '../components/addList';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Container, TaskItem, TaskList } from './styled';

interface Task {
  id: number;
  nome: string;
  custo: number;
  dataLimite: string;
  ordem: number;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <AddList onAdd={loadTasks} />
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
                <button>
                  <FiArrowUp />
                </button>
                <button>
                  <FiArrowDown />
                </button>
                <button className='trash' onClick={() => handleDelete(task.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </TaskItem>
          );
        })}
      </TaskList>
    </Container>
  );
}
