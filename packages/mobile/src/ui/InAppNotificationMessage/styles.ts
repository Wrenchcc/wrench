import styled from 'styled-components'

export const Base = styled.View`
  flex-direction: row;
  padding-horizontal: 14px;
  margin-horizontal: 10px;
  padding-vertical: 12px;
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'rgba(25, 25, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
`

export const Content = styled.View`
  margin-left: 10px;
  justify-content: center;
  flex: 1;
`
