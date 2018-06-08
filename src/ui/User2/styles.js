import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  flex-direction: row;
  padding-top: 15;
  padding-bottom: 15;
  border-bottom-width: 1;
  border-bottom-color: ${COLORS.DIVIDER};
`

export const Content = styled.View`
  margin-left: 10;
  justify-content: center;
`
