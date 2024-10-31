import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #E01A00;
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    visibility: hidden;
    text-align: center;
    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
