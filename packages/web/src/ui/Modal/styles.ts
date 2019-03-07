import styled from 'styled-components'

export const Base = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.42);
  left: 0;
  top: 0;
  z-index: 101;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  max-width: ${props => (props.large ? 700 : 450)}px;
  width: 100%;
  background: white;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
`

export const Close = styled.button`
  outline: none;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 15px;
  border: none;
  width: 15px;
  background: url(${require('./close.svg')}) no-repeat;
  background-size: 15px;
`
