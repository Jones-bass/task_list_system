import styled from "styled-components";
import { Tooltip } from "../Tooltip";

export const InputWrapper = styled.div`
  background: #f0f0f0;
  color: #666360;
  
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  
  display: flex;
  align-items: center;
  
  input {
    font-family: 'Roboto';
    flex: 1;
    padding: 4%;
    border: 0;
    background: transparent;
    color: #666360;
  }
`;

export const ErrorText = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0px;
  }

  span {
    background: #E01A00;
    color: #f0f0f0;
  }
`;
