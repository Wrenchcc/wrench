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
  padding: 0;
`

export const Meta = styled.div`
  display: flex;
  flex-direction: row;
`

export const LoadReplies = styled.button`
  margin-left: 70px;
  margin-bottom: 20px;
  border: none;
  padding: 0;
`

export const Action = styled.div`
  margin-right: 10px;
`

export const Comment = styled(UiText)`
  display: inline;
`

export const Content = styled.div`
  margin-left: 10px;
  margin-top: -7px;
  margin-right: 20px;
`

export const Inner = styled.div`
  display: flex;
  padding: 10px 0;
  margin-left: ${props => (props.isReply ? 40 : 0)}px;
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
