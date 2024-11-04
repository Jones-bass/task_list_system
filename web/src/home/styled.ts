import styled from 'styled-components';

interface TaskItemProps {
  $custo: number;
}

export const Container = styled.div`
  display: flex;
  width: 100vw;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; 
  
  img {
    margin-top: 4%;
    width: 10%;
  }

  @media (max-width: 768px) {
    img {
      width: 40%;
      padding: 4%;
    }
  }
`;

export const TaskList = styled.div`
  margin-top: 2%;
  width: 100%;
  max-width: 30%;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 60%; 
  }
`;

export const TaskItem = styled.div<TaskItemProps>`
  display: grid;
  grid-template-columns: 1fr 1fr auto; 
  gap: 20px;
  padding: 2%;

  background-color: ${(props) => (props.$custo >= 1000 ? '#FFF3B0' : '#F9F9F9')};

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    text-align: center;
    padding: 1rem;
    margin: 0 1rem;
  }

  
  .task-info {
    display: flex;
    margin-left: 15%;
    flex-direction: column;

    h1 {
      color: #333;
      font-size: clamp(1.2rem, 1.2vw + 1.2rem, 1.5rem);
      margin-bottom: 5px;
    }

    p {
      font-size: clamp(0.65rem, 0.65vw + 0.65rem, 1rem);
      color: #666;
    }

    @media (max-width: 768px) {
      margin-left: 0; 
    }
  }

  .task-date {
    display: flex;
    flex-direction: column;
    color: #333;

    text-align: center;
    align-items: center;
    justify-content: center;
  
    .day {
      font-size: clamp(2rem, 2vw + 2rem, 3rem);
      font-weight: bold;
    }

    .month {
      font-size: clamp(0.6rem, 0.7vw + 0.7rem, 1.2rem);
      text-transform: capitalize; 
    }

    .year {
      font-size: clamp(0.8rem, 1vw + 1rem, 1.5rem);
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
    gap: 1px;

    button {
      display: flex; 
      justify-content: center; 
      align-items: center; 
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: none;
      color: #333;

      gap: 8px;

      font-size: clamp(0.8rem, 1vw + 1rem, 1.5rem);
      
      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
      border-radius: 8px; 

      &:hover {
        background-color: #666;
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
  
  @media (max-width: 768px) {
    .actions {
      flex-direction: row;
      gap: px;
    }
  }
`;
