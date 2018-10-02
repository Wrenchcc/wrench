import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`

export const Bottom = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20;
`

export const TakePicture = styled(UiTouchable)`
  justify-content: center;
  align-self: center;
  width: 80;
  height: 80;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 80;
`
