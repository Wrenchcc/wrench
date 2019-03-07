import styled from 'styled-components'
import { COLORS } from '../../ui/constants'

export const Base = styled.footer`
  background: white;
`

export const Inner = styled.div`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Navigation = styled.nav`
  height: 100%;
  margin-top: 100px;
  display: flex;
  width: 100%;
`

export const NavItem = styled.li`
  margin-top: 20px;

  a {
    color: ${COLORS.LIGHT_GREY};
  }
`

export const Column = styled.div`
  width: 25%;
`

export const Bottom = styled.div`
  width: 100%;
  align-self: flex-end;
  padding-bottom: 75px;
  padding-top: 35px;
  margin-top: 80px;
  border-top: 1px solid ${COLORS.ULTRA_LIGHT_GREY};
`
