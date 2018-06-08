import styled from 'styled-components'
import UiCard from 'ui/Card'
import UiTitle from 'ui/Title'

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

export const Base = styled.View`
  flex: 1;
`

export const Card = styled(UiCard)`
  margin-right: 20;
  margin-right: ${props => (props.last ? GUTTER : BAR_SPACE)};
  margin-left: ${props => (props.first ? GUTTER : 0)};
`

export const Scroll = styled.ScrollView`
  margin-left: -${GUTTER};
  margin-right: -${GUTTER};
`

export const Title = styled(UiTitle)`
  margin-bottom: 40;
  margin-top: 50;
`
