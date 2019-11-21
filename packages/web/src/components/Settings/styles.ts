// @ts-nocheck
import styled from 'styled-components'
import { Link } from 'react-scroll'
import { DEVICE, COLORS } from 'ui/constants'
import UiText from 'ui/Text'
import UiTitle from 'ui/Title'

export const Left = styled.div`
  margin-right: 60px;
  max-width: 360px;
  position: fixed;

  @media ${DEVICE.TABLET} {
    margin-right: 0;
    max-width: 100%;
    position: static;
  }
`

export const Toast = styled.div`
  position: fixed;
  padding: 0 30px;
  height: 50px;
  background: ${props => (props.error ? '#ec6d2f' : 'black')};
  right: 30px;
  top: 90px;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 1001;
`

export const Row = styled.div`
  margin-top: ${props => (props.last ? 30 : 0)}px;
  position: relative;
`

export const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLORS.ULTRA_LIGHT_GREY};
  padding-bottom: 10px;
  margin-bottom: 10px;
  height: 40px;

  a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
  }
`

export const MenuTitle = styled(UiTitle)`
  margin-bottom: 50px;
`

export const MenuItem = styled(Link)`
  margin-bottom: 20px;
  display: block;

  &.active p {
    color: black;
    font-weight: 500;
  }
`

export const Headline = styled.div`
  margin-bottom: 40px;
`

export const Counter = styled(UiText)`
  position: absolute;
  right: 0;
  top: 17px;
`

export const Right = styled.div`
  margin-left: 420px;
  width: 100%;

  @media ${DEVICE.TABLET} {
    margin-left: 0;
  }
`

export const Section = styled.section`
  margin-bottom: 100px;
`
