import styled from 'styled-components'

export const Base = styled.div`
  padding-top: 30px;
`

export const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`

export const Content = styled.div`
  margin-left: 10px;
`

export const Inner = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
  flex-direction: row;
  display: flex;
`

export const Scroll = styled.div`
  overflow-y: scroll;
  max-height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }
`
