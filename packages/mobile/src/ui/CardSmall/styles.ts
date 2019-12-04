import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiText from 'ui/Text'

export const SIZE = 120

export const ProjectName = styled(UiText)`
  margin-top: 10px;
  margin-bottom: 5px;
  width: ${SIZE}px;
`

export const Picture = styled(UiImage)`
  height: ${SIZE}px;
  width: ${SIZE}px;
`
