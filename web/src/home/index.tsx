import { useMemo } from 'react';
import { FiTrash2, FiEdit2, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { AddList } from '../components/addList';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Container, TaskItem, TaskList } from './styled';
import { IconList } from '../components/IconList';
import { ConfirmModalDelete } from '../components/diolog';
import { Task, useTaskContext } from '../hook/TaskContext';
import logo from "../assets/Camada_x0020_1 (1).svg"

export function Home() {
  const {
    tasks,
    loadTasks,
    moveTaskUp,
    moveTaskDown,
    confirmDelete,
    openDeleteModal,
    closeDeleteModal,
    editingTask,
    taskToDelete,
    isDeleteModalOpen,
    setEditingTask,
    handleUpdate
  } = useTaskContext();
  
  const handleEdit = (task: Task) => {
    setEditingTask(task);
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
