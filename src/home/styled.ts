import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;  
  height: 100vh;  
  background-color: #d9d9d9d9;  
  box-sizing: border-box;  

  form {
    display: flex;
    max-width: 1280px;
    width: 50%;

    gap: 4px;
    padding: 1%;
    
    background-color: #f9f9f9;  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > * {
    flex: 1;
  }

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

export const Button = styled.button`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  padding: 1%;
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

