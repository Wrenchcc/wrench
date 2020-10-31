import styled from 'styled-components'
import { DEVICE } from 'ui/constants'
import UiImage from '../Image'
import UiText from '../Text'

export const WIDTH = 333
export const HEIGHT = 180

export const Base = styled.div`
  position: relative;
  margin-right: 20px;

  @media ${DEVICE.MOBILE_LARGE} {
    margin-right: 0;
  }
`

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
`

export const Inner = styled.div`
  position: absolute;
  bottom: 0px;
  padding: 10px;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
`

export const Content = styled.div`
  max-width: 55%;
  padding-right: 20px;
`

export const ProjectName = styled(UiText)`
  margin-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const Picture = styled(UiImage)`
  height: ${HEIGHT}px;
`
