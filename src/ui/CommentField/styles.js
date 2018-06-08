import { StyleSheet } from 'react-native'
import UiInput from 'ui/Input'
import UiTouchable from 'ui/Touchable'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  position: relative;
`

export const Input = styled(UiInput)`
  font-size: 17;
  padding-top: 20;
  padding-bottom: 20;
  margin-bottom: 15;
  color: ${COLORS.DARK};
  border-bottom-color: ${COLORS.DIVIDER};
  border-bottom-width: ${StyleSheet.hairlineWidth};
`

export const Button = styled(UiTouchable)`
  position: absolute;
  right: 0;
  top: 20;
`
