// @ts-nocheck
import styled from 'styled-components'
import UiSearch from '../Search'
import UiAvatar from 'ui/Avatar'
import { FONTS, DEVICE, COLORS } from 'ui/constants'

export const Base = styled.div`
  display: flex;
  height: 70px;
  align-items: center;
  box-shadow: ${(props) => (props.inverted ? ' 0 0 0 0' : `0 1px 1px 0 ${props.theme.colors.divider}`)};
  padding: 0 50px;
  background: ${(props) => (props.inverted ? 'transparent' : props.theme.colors.default)};
  position: ${(props) => (props.inverted ? 'absolute' : 'sticky')};
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;

  @media ${DEVICE.TABLET} {
    padding: 20px;
    height: auto;
    box-shadow: none;
  }
`

export const Nav = styled.nav`
  @media ${DEVICE.TABLET} {
    display: none;
  }
`

export const OpenMobileMenu = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 40px;
  height: 40px;
  z-index: 100;
  border: 1px solid
    ${(props) => (props.inverted ? 'rgba(230, 231, 233, 0.3)' : props.theme.colors.neutral)};
  border-radius: 1px;
  display: none;
  justify-content: center;

  @media ${DEVICE.TABLET} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const NavLink = styled.a`
  font-size: 16px;
  color: ${(props) =>
    props.inverted ? (props.active ? '#a8a8ad' : '#fff') : props.active ? props.theme.colors.inverse : '#6d6f76'};
  font-weight: ${FONTS.MEDIUM};
  margin-left: ${(props) => (props.last ? 10 : 40)}px;
`

export const Separator = styled.span`
  margin-left: 10px;
  color: ${(props) =>
    (props.inverted && 'rgba(255, 255, 255, .6)') || (props.active ? props.theme.colors.inverse : '#6d6f76')};
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
