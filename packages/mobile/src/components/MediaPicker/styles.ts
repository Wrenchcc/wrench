import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  flex: 1;
`

export const OpenAlbum = styled(UiTouchable)`
  width: 40px;
  height: 40px;
  background: black;
  position: absolute;
  bottom: ${hasNotch ? 25 : 20}px;
  left: 20px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`
