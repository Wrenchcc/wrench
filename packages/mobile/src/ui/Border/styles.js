import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  border-bottom-color: ${COLORS.ULTRA_LIGHT_GREY};
  border-bottom-width: 1;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`
