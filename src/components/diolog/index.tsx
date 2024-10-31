import * as Dialog from '@radix-ui/react-dialog';
import { Task } from '../../home';
import { LuX } from 'react-icons/lu';
import { Overlay, Content, CloseButton, ConfirmButton, CancelButton, ModalButtons } from './styled';

interface DiologProps {
  isOpen: boolean;
  onClose: () => void;
  taskToDelete: Task | null;
  onConfirmDelete: () => void;
}

export function Diolog({ isOpen, onClose, taskToDelete, onConfirmDelete }: DiologProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <p>Tem certeza que deseja excluir a tarefa "{taskToDelete?.nome}"?</p>
          <ModalButtons>
            <ConfirmButton onClick={onConfirmDelete}>Excluir</ConfirmButton>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
          </ModalButtons>
          <CloseButton onClick={onClose}>
            <LuX size={24} />
          </CloseButton>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
