import styled from 'styled-components';

interface TaskItemProps {
  custo: number;
}

export const Container = styled.div`
  display: flex;
  width: 100vw;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;  
`;

export const TaskList = styled.div`
  margin-top: 2%;
  width: 100%;
  max-width: 30%;
  border-radius: 8px;
`;

export const TaskItem = styled.div<TaskItemProps>`
  display: grid;
  grid-template-columns: 1fr 1fr auto; 
  gap: 20px;
  padding: 2%;
  background-color: ${props => (props.custo >= 1000 ? '#FFF3B0' : '#F9F9F9')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  .task-info {
    display: flex;
    flex-direction: column;

    h1 {
      color: #333;
      font-size: 1.5rem;
      margin-bottom: 5px;
    }

    p {
      font-size: 1rem;
      color: #666;
    }
  }

  .task-date {
    display: flex;
    flex-direction: column;

    text-align: center;
    align-items: center;
    justify-content: center;
  

    .day {
      font-size: 3rem;
      font-weight: bold;
    }

    .month {
      font-size: 1.2rem;
      text-transform: capitalize; /* Para o mês começar com letra maiúscula */
    }

    .year {
      font-size: 1.5rem;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    width: 100%;
    gap: 8px;

    button {
      display: flex; /* Flexbox no botão para centralizar o ícone */
      justify-content: center; /* Centralizar horizontalmente */
      align-items: center; /* Centralizar verticalmente */
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: none;
      color: #333;

      gap: 8px;

      font-size: 14px; /* Aumenta o tamanho do ícone */

      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
      border-radius: 8px; /* Bordas arredondadas para o hover */

      &:hover {
        background-color: #4CAF50;
        color: white;
        border-radius: 8px;
      }

      &:focus {
        outline: none;
      }
    }
      .trash {
      &:hover {
        background-color: red;
        color: white;
      }
    }
  }
`;
