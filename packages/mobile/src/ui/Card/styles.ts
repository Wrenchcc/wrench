import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiText from 'ui/Text'

export const ProjectName = styled(UiText)`
  margin-top: 10;
  margin-bottom: 5;
  width: ${props => props.width};
`

export const Username = styled(UiText)`
  width: ${props => props.width};
`

export const Picture = styled(UiImage)`
  height: ${props => props.height};
  width: ${props => props.width};
`
