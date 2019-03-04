import styled from 'styled-components'
import {
  Slider as PSlider,
  Slide as PSlide,
  ButtonBack as PButtonBack,
  ButtonNext as PButtonNext,
  DotGroup as PDotGroup,
} from 'pure-react-carousel'

export const Base = styled.div`
  overflow: hidden;
`

export const Slider = styled(PSlider)`
  position: relative;
  overflow: hidden;
  width: 100%;
`

export const Slide = styled(PSlide)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ButtonBack = styled(PButtonBack)`
  cursor: pointer;
`

export const ButtonNext = styled(PButtonNext)`
  cursor: pointer;
`

export const DotGroup = styled(PDotGroup)``
