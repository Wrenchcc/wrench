import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'

const SIZE = 180

export const Base = styled.div`
  width: ${SIZE}px;
`

export const ProjectName = styled(UiText)`
  margin-top: 10;
`

export const Picture = styled(UiImage)`
  height: ${SIZE};
  width: ${SIZE};
`
