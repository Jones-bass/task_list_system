import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2%;
  background: #d9d9d9d9;  
  box-sizing: border-box;   

  form {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    
    width: 60vw;
    padding: 1%;
  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
`;

export const Button = styled.button`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1%;
  display: flex;
  margin-left: 2px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;

  font-size: 26px;
  
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

