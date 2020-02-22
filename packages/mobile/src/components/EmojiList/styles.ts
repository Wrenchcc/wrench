import styled from 'styled-components'

export const Base = styled.View`
  height: 50px;
  width: 100%;
  background: ${props => props.theme.colors.default};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
