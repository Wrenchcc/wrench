// @ts-nocheck
import styled from 'styled-components'
import { FONTS } from 'ui/constants'

export const Base = styled.div`
  width: 100%;
  top: 0px;
  z-index: 1002;
  position: absolute;
  background: black;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
`

export const Nav = styled.nav`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`

export const Close = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1px solid rgba(230, 231, 233, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NavLink = styled.a`
  font-size: 16px;
  color: ${props => (props.active ? 'white' : 'rgba(255, 255, 255, .6)')};
  margin-bottom: 30px;
  font-weight: ${FONTS.MEDIUM};
  margin-top: ${props => (props.last ? 30 : 0)}px;
  border-top: 1px solid ${props => (props.last ? 'rgba(230, 231, 233, 0.3)' : 'transparent')};
  padding-top: ${props => (props.last ? 40 : 0)}px;
`
