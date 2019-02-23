import styled from 'styled-components'
import UiSearch from '../Search'

export const Base = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: 0 1px 1px 0 #e6e7e9;
  padding: 0 20px;
`

export const Nav = styled.nav`
  padding-left: 35px;
`

export const NavLink = styled.a`
  color: ${props => (props.active ? 'black' : 'grey')};
  margin-right: 40px;
`

export const Search = styled(UiSearch)`
  margin-left: 35px;
`
