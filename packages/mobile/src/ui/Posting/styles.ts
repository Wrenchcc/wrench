import styled from 'styled-components'

export const Base = styled.View`
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'rgba(25, 25, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  height: 60px;
  margin-horizontal: 10px;
`

export const Image = styled.Image`
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
