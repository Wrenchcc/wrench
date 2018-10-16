import { StyleSheet } from 'react-native'
import UiInput from 'ui/Input'
import UiTouchable from 'ui/Touchable'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex-direction: row;
  border-bottom-color: ${COLORS.DIVIDER};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  margin-bottom: 10;
`

export const Input = styled(UiInput)`
  flex: 1;
  font-size: 17;
  border-bottom-width: 0;
  padding-right: 10;
`

export const Button = styled(UiTouchable)`
  align-self: center;
`
