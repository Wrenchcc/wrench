import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { hasNotch } from 'utils/platform'

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

export const DeselectAll = styled(UiTouchable)`
  height: 40;
  background: white;
  position: absolute;
  bottom: ${hasNotch ? 25 : 20};
  right: 20;
  border-radius: 40;
  z-index: 99;
  padding-left: 20;
  padding-right: 20;
  justify-content: center;
`
