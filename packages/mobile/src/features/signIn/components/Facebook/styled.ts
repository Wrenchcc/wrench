import styled from 'styled-components'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Button = styled(Touchable)`
  width: 100%;
  background: ${COLORS.FACEBOOK};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
`

export const Text = styled(UiText)`
  text-align: center;
  color: ${COLORS.WHITE};
`

export const Loader = styled.ActivityIndicator`
  margin-left: 10;
`
