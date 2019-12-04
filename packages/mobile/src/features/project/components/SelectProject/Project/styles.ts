import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiImage from 'ui/Image'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  height: 52px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-color: ${COLORS.ULTRA_LIGHT_GREY};
`

export const Cover = styled(UiImage)`
  width: 40px;
  height: 40px;
`

export const Middle = styled.View`
  flex-direction: row;
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 20px;
`

export const Icon = styled.Image`
  align-self: center;
`
