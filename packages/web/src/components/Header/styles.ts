import styled from 'styled-components'
import UiSearch from '../../ui/Search'
import UiAvatar from '../../ui/Avatar'
import { FONTS } from '../../ui/constants'

export const Base = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: 0 1px 1px 0 #e6e7e9;
  padding: 0 20px;
  background: white;
`

export const Nav = styled.nav`
  padding-left: 35px;
`

export const NavLink = styled.a`
  font-size: 17px;
  color: ${props => (props.active ? '#000000' : '#6d6f76')};
  font-weight: ${props => (props.active ? FONTS.MEDIUM : FONTS.REGULAR)};
  margin-right: 40px;
`

export const Search = styled(UiSearch)`
  margin-left: 35px;
`

export const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const Avatar = styled(UiAvatar)`
  margin-left: 30px;
`
