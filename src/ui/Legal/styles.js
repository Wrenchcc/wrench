import styled from 'styled-components'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export const Text = styled(UiText)`
  color: ${COLORS.WHITE};
  opacity: 0.8;
  font-size: 12;
`

export const Link = styled.TouchableOpacity`
  margin-top: -2px;
`
