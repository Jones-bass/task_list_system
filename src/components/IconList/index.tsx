import { FaTasks } from 'react-icons/fa'
import { ContainerIcon, IconImage } from './styles'

export function IconList() {
  return (
    <ContainerIcon>
      <IconImage>
        <FaTasks />
      </IconImage>
      <p>
        Você ainda não tem tarefas cadastradas <br /> Crie tarefas e organize
        seus itens a fazer
      </p>
    </ContainerIcon>
  )
}
