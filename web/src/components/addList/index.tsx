import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react';
import { Button, Container } from './styled';
import { Input } from '../inputList';
import { FiPlus } from 'react-icons/fi';
import { Loading } from '../loading';
import { api } from '../../services/api';
import { CiSaveUp1 } from 'react-icons/ci';
import { Task } from '../../hook/TaskContext';

interface AddTaskProps {
  onAdd: (newTask: Task) => void;
  editingTask?: Task | null;
  onUpdate?: (updatedTask: Task) => void;
}

const createUserSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'O Nome da tarefa é obrigatório',
    }),
  cost: z
    .string()
    .min(1, {
      message: 'O Custo é obrigatório',
    }),
  deadline: z
    .string()
    .min(1, {
      message: 'A Data é obrigatória',
    }),
});

type CreateUserData = z.infer<typeof createUserSchema>;

export function AddList({ editingTask, onAdd, onUpdate }: AddTaskProps) {
  const [loading, setLoading] = useState(false);

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, setValue
  } = createUserForm;

  useEffect(() => {
    if (editingTask) {
      setValue("title", editingTask.title);
      setValue("cost", editingTask.cost.toFixed(2));
      setValue("deadline", editingTask.deadline.split('T')[0]);
    } else {
      reset();
    }
  }, [editingTask, reset, setValue]);

  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true);

        const requestData = {
          ...data,
          cost: Number(data.cost),
          deadline: new Date(data.deadline).toISOString(),
        };

        if (editingTask && onUpdate) {
          const response = await api.put(`/task/${editingTask.id}`, requestData);
          onUpdate(response.data); // Atualiza a tarefa

          onAdd(response.data);
          toast.success('Tarefa atualizada com sucesso!');
        } else {
          const response = await api.post('/task', requestData);
          onAdd(response.data);
          toast.success('Tarefa adicionada com sucesso!');
        }
        reset();
      } catch (error) {
        toast.error('Ocorreu um erro ao cadastrar, tente novamente!');
      } finally {
        setLoading(false);
      }
    },
    [editingTask, reset, onAdd, onUpdate]
  );

  return (
    <Container>
      <FormProvider {...createUserForm}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            name="title"
            placeholder="Nome da tarefa"
            errorMessage={errors?.title?.message ?? ''}
          />
          <Input
            className='custo'
            name="cost"
            placeholder="R$ Custo"
            errorMessage={errors?.cost?.message ?? ''}
          />
          <Input
            className='date'
            name="deadline"
            type='date'
            placeholder="Data"
            errorMessage={errors?.deadline?.message ?? ''}
          />
          <Button type="submit" disabled={isSubmitting}>
            {loading ? <Loading /> : editingTask ? <CiSaveUp1 /> : <FiPlus />}
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}
