import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  max-width: 1280px;
  width: 50%;

  gap: 4px;
  padding: 1%;
  
  background-color: #f9f9f9;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  input {
    background-color: #f0f0f0;
    color: gray;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }
`;

export const ErrorText = styled.span`
  color: #c53030;
  flex-direction: column;
  margin-top: 4px;
  font-size: 12px;
  text-align: start;
`;
