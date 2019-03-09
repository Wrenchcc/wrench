import styled from 'styled-components'
import UiSearch from '../Search'
import UiAvatar from '../../ui/Avatar'
import { FONTS, DEVICE } from '../../ui/constants'

export const Base = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: ${props => (props.inverted ? ' 0 0 0 0' : ' 0 1px 1px 0 #e6e7e9')};
  padding: 0 50px;
  background: ${props => (props.inverted ? 'transparent' : 'white')};
  position: ${props => (props.inverted ? 'absolute' : 'sticky')};
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;

  @media ${DEVICE.TABLET} {
    padding: 25px;
    height: auto;
  }
`

export const Nav = styled.nav`
  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const NavLink = styled.a`
  font-size: 16px;
  color: ${props => (props.inverted && 'rgba(255, 255, 255, .6)') || (props.active ? '#000000' : '#6d6f76')};
  font-weight: ${FONTS.MEDIUM};
  margin-left: 40px;
`

export const Search = styled(UiSearch)`
  margin-left: 40px;

  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const Avatar = styled(UiAvatar)`
  margin-left: 30px;
  cursor: pointer;
`

export const UserMenu = styled.div`
  position: relative;
`

export const UserNotifications = styled.div`
  position: relative;
`
