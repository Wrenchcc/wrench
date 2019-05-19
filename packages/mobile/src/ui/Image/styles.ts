import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  background-color: ${({ placeholderColor }) => placeholderColor || COLORS.ULTRA_LIGHT_GREY};
  overflow: hidden;
`
