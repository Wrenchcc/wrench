import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 40;
  padding-right: 40;
`

export const Headline = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Description = styled(UiText)`
  margin-bottom: 30px;
`
