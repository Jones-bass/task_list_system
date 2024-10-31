import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  inset: 0;
  z-index: 9999; 
  animation: ${fadeIn} 0.3s ease-in-out;
  `;

export const Content = styled(Dialog.Content)`
  padding: 5% 0% 5% 0%;
  background: #f0f0f0;
  color: #333;

  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; 
  animation: ${slideUp} 0.3s ease-in-out;
  text-align: center;
`;


export const CloseButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #333;
  font-size: 1.5rem;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #d9534f;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }
`;

export const CancelButton = styled.button`
  background-color: #5bc0de;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-left: 1rem;

  &:hover {
    background-color: #31b0d5;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;