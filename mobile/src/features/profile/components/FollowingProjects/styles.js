import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  background-color: ${COLORS.DIVIDER};
  flex: 1;
  padding-left: 20;
  padding-right: 20;
  padding-bottom: 50;
`

export const Title = styled(UiTitle)`
  margin-top: 60;
  margin-bottom: 15;
`

export const Description = styled(UiText)`
  margin-bottom: 30;
`
