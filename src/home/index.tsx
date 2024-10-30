import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useCallback, useState } from 'react';
import { Button, Container, InputRow } from './styled';
import { Input } from '../components/inputList';
import { FiPlus } from 'react-icons/fi';
import { Loading } from '../components/loading';
import { api } from '../services/api';

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

export function Home() {
  const [loading, setLoading] = useState(false);

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = createUserForm;

  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true);
        console.log('Usuário', data);

        const taskData = {
          nome: data.name,
          custo: parseFloat(data.custo), 
          dataLimite: data.date,
          ordem: Date.now(), 
        };

        await api.post('/tarefas', taskData);

      } catch (error) {
        toast.error('Ocorreu um erro ao cadastrar, tente novamente!');
      } finally {
        setLoading(false);
      }
    },
    [reset],
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
          <InputRow>
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
            <Button type="submit" disabled={isSubmitting || loading}>
              {loading ? <Loading /> : <FiPlus />}
            </Button>
          </InputRow>
        </form>
      </FormProvider>
    </Container>
  );
}
