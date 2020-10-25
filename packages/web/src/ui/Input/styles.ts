import styled from 'styled-components'

export const Base = styled.input`
  width: 100%;
  background: none;
  border: none;
  height: 60px;
  border-bottom: 1px solid rgb(230, 231, 233);
  font-size: 17px;
  outline: none;
  color: ${props => props.theme.colors.inverse};

  &::placeholder {
    color: ${props => props.theme.colors.neutral};
  }
`
