// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'
import { CloseIcon as UICloseIcon } from '@wrench/ui'
  
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
  max-width: ${(props) => (props.large ? 640 : 450)}px;
  width: 100%;
  background: ${props => props.theme.colors.default};
  padding: ${(props) => (props.large ? 20 : 40)}px;
  height: ${(props) => (props.large ? '65%' : 'auto')};
  box-sizing: border-box;
  position: relative;

  @media ${DEVICE.TABLET} {
    width: 100%;
    height: 100vh;
    max-width: initial;
  }
`

export const CloseIcon = styled(UICloseIcon)`
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 16px;
  border: none;
  width: 15px;
  z-index: 1001;
`
