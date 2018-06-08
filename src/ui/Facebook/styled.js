import styled from 'styled-components'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Button = styled(Touchable)`
  background-color: ${COLORS.FACEBOOK};
  padding: 20px;
`

export const Text = styled(UiText)`
  text-align: center;
  color: ${COLORS.WHITE};
`
