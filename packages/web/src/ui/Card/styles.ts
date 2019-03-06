import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'

const SIZE = 235

export const Base = styled.div`
  width: ${SIZE}px;
  margin-left: 40px;
  margin-bottom: 70px;
`

export const ProjectName = styled(UiText)`
  margin-top: 10px;
`

export const Picture = styled(UiImage)`
  height: ${SIZE}px;
  width: ${SIZE}px;
`
