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
  overflow: hidden;

  @media ${DEVICE.TABLET} {
    margin-left: -20px;
    margin-right: -20px;
  }
`

export const Image = styled(UiImage)`
  @media ${DEVICE.TABLET} {
    max-width: 100%;
    max-height: auto;
  }
`

export const Slider = styled(PSlider)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

export const Slide = styled(PSlide)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ButtonBack = styled(PButtonBack)`
  background: url(${require('./arrow-back.svg')}) no-repeat left center;
  background-size: 31px;
  width: 31px;
  height: 31px;
  border: none;
  outline: none;
  text-indent: -99999px;
  margin-left: 20px;

  &:disabled {
    opacity: 0.3;
  }
`

export const ButtonNext = styled(PButtonNext)`
  cursor: pointer;
  background: url(${require('./arrow-forward.svg')}) no-repeat;
  background-size: 31px;
  width: 31px;
  height: 31px;
  border: none;
  outline: none;
  text-indent: -99999px;
  margin-right: 20px;

  &:disabled {
    opacity: 0.3;
  }
`

export const DotGroup = styled(PDotGroup)``
