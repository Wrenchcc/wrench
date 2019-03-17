import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiText from 'ui/Text'

export const SIZE = 180

export const ProjectName = styled(UiText)`
  margin-top: 10;
  margin-bottom: 5;
  width: ${SIZE};
`

export const Picture = styled(UiImage)`
  height: ${SIZE};
  width: ${SIZE};
`
