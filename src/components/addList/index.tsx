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
import { format, parse } from 'date-fns';
import { Task } from '../../home';
import { CiSaveUp1 } from 'react-icons/ci';

interface AddTaskProps {
  onAdd: () => void;
  editingTask?: Task | null;
  onUpdate?: (updatedTask: Task) => void;
}

const createUserSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'O Nome da tarefa é obrigatório',
    }),
  custo: z
    .string()
    .min(1, {
      message: 'O Custo é obrigatório',
    }),
  date: z
    .string()
    .min(1, {
      message: 'A Data é obrigatória',
    }),
});

type CreateUserData = z.infer<typeof createUserSchema>;

export function AddList({ onAdd, editingTask, onUpdate }: AddTaskProps) {
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
      setValue("name", editingTask.nome);
      setValue("custo", editingTask.custo.toFixed(2));
      setValue("date", editingTask.dataLimite.split('T')[0]);
    } else {
      reset();
    }
  }, [editingTask, reset, setValue]);


  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const parsedDate = parse(data.date, 'yyyy-MM-dd', new Date());
        const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

        const taskData = {
          id: editingTask?.id,
          nome: data.name,
          custo: parseFloat(data.custo.replace(/[R$\s.]/g, '').replace(',', '.')),
          dataLimite: formattedDate,
          ordem: editingTask ? editingTask.ordem : Date.now(),
          
        };

        if (editingTask && onUpdate) {
          onUpdate(taskData as Task); 
          toast.success('Tarefa atualizada com sucesso!');
        } else {
          await api.post('/tarefas', taskData); 
          toast.success('Tarefa adicionada com sucesso!');
          onAdd();
        }

        reset();
      } catch (error) {
        toast.error('Ocorreu um erro ao cadastrar, tente novamente!');
      } finally {
        setLoading(false);
      }
    },
    [reset, editingTask, onUpdate, onAdd],
  );

  return (
    <Container>
      <FormProvider {...createUserForm}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            name="name"
            placeholder="Nome da tarefa"
            errorMessage={errors?.name?.message ?? ''}
          />
          <Input
            className='custo'
            name="custo"
            placeholder="R$ Custo"
            errorMessage={errors?.custo?.message ?? ''}
          />
          <Input
            className='date'
            name="date"
            type='date'
            placeholder="Data"
            errorMessage={errors?.date?.message ?? ''}
          />
          <Button type="submit" disabled={isSubmitting}>
          {loading ? <Loading /> : editingTask ? <CiSaveUp1 /> : <FiPlus />}
          </Button>

        </form>

      </FormProvider>
    </Container>
  );
}
