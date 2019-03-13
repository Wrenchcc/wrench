import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiImage from 'ui/Image'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  padding-bottom: 15;
  margin-bottom: 15;
  border-bottom-color: ${COLORS.ULTRA_LIGHT_GREY};
`

export const Cover = styled(UiImage)`
  width: 40;
  height: 40;
`

export const Middle = styled.View`
  flex-direction: row;
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  margin-left: 10;
`

export const Icon = styled.Image`
  align-self: center;
`
