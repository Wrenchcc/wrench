import styled from 'styled-components'

export const Base = styled.View`
  height: ${(props) => props.height}px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.default};
  padding-horizontal: 20px;
  padding-top: 15px;
`

export const Row = styled.View`
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.divider};
  justify-content: center;
`

export const Bar = styled.View`
  align-self: center;
  height: 4px;
  background-color: ${(props) => props.theme.colors.divider};
  width: 60px;
  margin-bottom: 15px;
`
