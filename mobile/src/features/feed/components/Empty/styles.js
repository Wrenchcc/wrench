import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiProjectCard from 'ui/ProjectCard'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.View``

export const Headline = styled(UiTitle)`
  margin-bottom: 12;
`

export const Description = styled(UiText)`
  margin-bottom: 40;
`

export const Title = styled(UiTitle)`
  margin-bottom: 10;
`

export const { width } = Dimensions.get('window')

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

// TODO: Fix margins
// margin-left: ${({ first }) => (first ? GUTTER : 0)};
export const ProjectCard = styled.View`
  width: ${width - 40};
  height: 200;
  background: black;
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)};
  margin-bottom: 50;
`
