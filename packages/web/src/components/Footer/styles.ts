import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Base = styled.footer`
  background: ${(props) => props.theme.colors.default};

  @media ${DEVICE.TABLET} {
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

  @media ${DEVICE.TABLET} {
    flex-direction: column;
    margin-top: 30px;
  }
`

export const NavItem = styled.li`
  margin-top: 20px;

  a {
    color: ${(props) => props.theme.colors.neutral} !important;
  }
`

export const Column = styled.div`
  width: 25%;

  @media ${DEVICE.TABLET} {
    width: 50%;
    margin-bottom: 40px;
  }
`

export const Left = styled.div``

export const Right = styled.div`
  @media ${DEVICE.TABLET} {
    margin-top: 30px;
  }
`

export const Bottom = styled.div`
  width: 100%;
  align-self: flex-end;
  padding-bottom: 75px;
  padding-top: 35px;
  margin-top: 80px;
  border-top: 1px solid ${(props) => props.theme.colors.divider};
  justify-content: space-between;
  flex-direction: row;
  display: flex;

  @media ${DEVICE.TABLET} {
    justify-content: flex-start;
    padding-bottom: 30px;
    margin-top: 20px;
    flex-direction: column;
  }
`
