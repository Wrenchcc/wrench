import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'

export const Base = styled.View`
  flex: 1;
  background-color: ${COLORS.DIVIDER};
  justify-content: center;
  padding-left: 20;
  padding-right: 20;
`

export const Title = styled(UiTitle)`
  margin-top: 60;
  margin-bottom: 15;
`

export const Description = styled(UiText)`
  margin-bottom: 30;
`
