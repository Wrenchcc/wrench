import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'
import { DEVICE } from '../constants'

const SIZE = 235

export const Base = styled.div`
  width: ${SIZE}px;
  margin-left: 40px;
  margin-bottom: 70px;

  @media ${DEVICE.TABLET} {
    margin-left: 10px;
    width: 180px;
  }
`

export const ProjectName = styled(UiText)`
  margin-top: 10px;
`

export const Picture = styled(UiImage)`
  height: ${SIZE}px;
  width: ${SIZE}px;

  @media ${DEVICE.TABLET} {
    height: 180px;
    width: 180px;
  }
`
