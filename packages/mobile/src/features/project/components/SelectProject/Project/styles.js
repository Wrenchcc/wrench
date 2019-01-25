import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  padding-bottom: 15;
  margin-bottom: 15;
  border-bottom-color: ${COLORS.DIVIDER};
`

export const Cover = styled.Image`
  width: 40;
  height: 40;
  margin-right: 10;
`

export const Middle = styled.View`
  flex-direction: row;
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const Icon = styled.Image`
  align-self: center;
`
