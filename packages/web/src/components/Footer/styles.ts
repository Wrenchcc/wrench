import styled from 'styled-components'
import { COLORS } from '../../ui/constants'

export const Base = styled.footer`
  background: white;

  @media (max-width: 768px) {
    padding: 20px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 30px;
  }
`

export const NavItem = styled.li`
  margin-top: 20px;

  a {
    color: ${COLORS.GREY};
  }
`

export const Column = styled.div`
  width: 25%;

  @media (max-width: 768px) {
    width: 50%;
  }
`

export const Bottom = styled.div`
  width: 100%;
  align-self: flex-end;
  padding-bottom: 75px;
  padding-top: 35px;
  margin-top: 80px;
  border-top: 1px solid ${COLORS.ULTRA_LIGHT_GREY};

  @media (max-width: 768px) {
    padding-bottom: 30px;
  }
`
