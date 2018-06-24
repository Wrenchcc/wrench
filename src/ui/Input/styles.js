import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Field = styled.TextInput`
  font-size: 17;
  height: ${({ multiline }) => (multiline ? 'auto' : 60)};
  border-bottom-width: ${({ noBorder }) => (noBorder ? 0 : 1)};
  border-bottom-color: ${COLORS.DIVIDER};
  color: ${COLORS.WHITE};
  padding-top: 20;
  padding-bottom: 20;
`
