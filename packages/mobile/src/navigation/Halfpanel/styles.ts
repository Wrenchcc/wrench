import styled from 'styled-components'

export const Base = styled.View`
  background-color: ${(props) => props.theme.colors.default};
`

export const Row = styled.View`
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.divider};
  justify-content: center;
`
