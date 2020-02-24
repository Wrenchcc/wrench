import styled from 'styled-components'

export const Base = styled.View`
  background-color: ${props => props.theme.colors.subtle};
  opacity: 0.96;
  width: 100%;
  height: 60px;
`

export const Cover = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`
