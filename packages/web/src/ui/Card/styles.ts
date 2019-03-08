import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'

const SIZE = 235

export const Base = styled.div`
  width: ${SIZE}px;
  margin-left: 40px;
  margin-bottom: 70px;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    height: 180px;
    width: 180px;
  }
`
