import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  flex: 1;
`

export const OpenAlbum = styled(UiTouchable)`
  width: 40;
  height: 40;
  background: black;
  position: absolute;
  bottom: ${hasNotch ? 25 : 20};
  left: 20;
  border-radius: 40;
  justify-content: center;
  align-items: center;
  z-index: 99;
`
