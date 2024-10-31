import styled from 'styled-components'

export const ContainerIcon = styled.main`
  margin-top: 4%;
  color: #333;  

  p {
    color: ${(props) => props.theme.gray300};
    text-align: center;
    line-height: 25px;
  }
`

export const IconImage = styled.div`
  margin: auto;
  justify-content: center;
  text-align: center;

  font-size: 150px;
`
