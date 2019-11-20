// @ts-nocheck
import styled from 'styled-components'
import UiText from 'ui/Text'

export const Base = styled.div`
  height: 100%;
  padding-bottom: 90px;
  box-sizing: border-box;
`

export const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  height: ${props => (props.fullscreen ? '100%' : 'auto')};
`

export const Reply = styled.button`
  border: none;
  margin-top: -1px;
`

export const Meta = styled.div`
  display: flex;
  flex-direction: row;
`

export const Comment = styled(UiText)`
  display: inline;
`

export const Content = styled.div`
  margin-left: 10px;
  margin-top: -7px;
`

export const Inner = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const Username = styled(UiText)`
  display: inline;
`

export const Scroll = styled.div`
  overflow-y: scroll;
  height: 100%;
  margin-top: 40px;
  margin-bottom: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`
