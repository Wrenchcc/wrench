import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'

export const WIDTH = 333
export const HEIGHT = 180

export const Base = styled.div`
  position: relative;
  margin-right: 20px;
`

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.8;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
`

export const Inner = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px;
  z-index: 2;
`

export const ProjectName = styled(UiText)`
  margin-top: 10px;
`

export const Picture = styled(UiImage)`
  height: ${HEIGHT}px;
`
