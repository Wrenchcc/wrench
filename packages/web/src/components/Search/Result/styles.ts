import styled from 'styled-components'

export const List = styled.div`
  height: ${props => (props.active ? 'auto' : '0px')};
  overflow: hidden;
  top: 60px;
  box-sizing: border-box;
  max-height: 300px;
  position: absolute;
  background: white;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
`

export const Base = styled.div`
  display: flex;
`

export const Content = styled.div`
  margin-left: 10px;
`
