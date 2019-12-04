import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiText from 'ui/Text'

export const ProjectName = styled(UiText)`
  margin-top: 10px;
  margin-bottom: 5px;
  width: ${props => props.width}px;
`

export const Username = styled(UiText)`
  width: ${props => props.width}px;
`

export const Picture = styled(UiImage)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`
