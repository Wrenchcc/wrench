// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const List = styled.div`
  top: 60px;
  box-sizing: border-box;
  max-height: 300px;
  position: absolute;
  background: ${props => props.theme.colors.default};
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
  transition: 0.15s ease-in-out;
  will-change: transform;
  overflow-y: auto;

  a {
    display: flex;
  }
`

export const Base = styled.div`
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid ${props => (props.first ? 'transparent' : props.theme.colors.divider)};
`

export const Empty = styled.div`
  padding: 20px;
`

export const Content = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`
