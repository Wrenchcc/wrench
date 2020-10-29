import styled from 'styled-components'
import {
  Slider as PSlider,
  Slide as PSlide,
  ButtonBack as PButtonBack,
  ButtonNext as PButtonNext,
  DotGroup as PDotGroup,
} from 'pure-react-carousel'
import UiImage from 'ui/Image'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  @media ${DEVICE.TABLET} {
    margin-left: -20px;
    margin-right: -20px;
  }
`

export const Image = styled(UiImage)``

export const Slider = styled(PSlider)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

export const Slide = styled(PSlide)``

export const ButtonBack = styled(PButtonBack)`
  width: 44px;
  height: 48px;
  border: none;
  outline: none;
  margin-left: 20px;

  @media ${DEVICE.TABLET} {
    margin-left: 10px;
  }

  &:disabled {
    opacity: 0.3;
  }
`

export const ButtonNext = styled(PButtonNext)`
  cursor: pointer;
  width: 44px;
  height: 48px;
  border: none;
  outline: none;
  margin-right: 20px;

  @media ${DEVICE.TABLET} {
    margin-right: 10px;
  }

  &:disabled {
    opacity: 0.3;
  }
`

export const DotGroup = styled(PDotGroup)``
