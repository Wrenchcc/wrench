// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Inner = styled.div`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding-top: ${props => props.paddingTop || '0'}px;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'center'};
  flex-direction: ${props => props.direction || 'column'};
  height: 100%;
  position: relative;
  z-index: 10;

  @media ${DEVICE.TABLET} {
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
  }
`

export const Base = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  background: black;
  margin-top: 90px;
  padding-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media ${DEVICE.TABLET} {
    padding-top: 0;
  }
`

export const AppScreens = styled.picture`
  width: 482px;
  height: 524px;
  align-self: flex-end;

  img {
    width: 100%;
  }
`

export const Stores = styled.div`
  padding-bottom: 80px;

  @media ${DEVICE.TABLET} {
    padding-bottom: 40px;
    padding-top: 20px;
  }
`

export const Store = styled.img`
  margin: 0 5px;
  display: none;

  @media ${DEVICE.TABLET} {
    display: initial;
  }
`
