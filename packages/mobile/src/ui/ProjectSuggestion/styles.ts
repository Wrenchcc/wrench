import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiProjectCard from 'ui/ProjectCard'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const { width } = Dimensions.get('window')

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

export const Base = styled.View``

export const Headline = styled(UiTitle)`
  margin-bottom: 12px;
`

export const Description = styled(UiText)`
  margin-bottom: 40px;
`

export const Title = styled(UiTitle)`
  margin-bottom: 10px;
`

export const ProjectCard = styled(UiProjectCard)`
  width: ${width - GUTTER * 2}px;
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)}px;
  margin-left: ${({ first }) => (first ? GUTTER : 0)}px;
  margin-bottom: 50px;
`
