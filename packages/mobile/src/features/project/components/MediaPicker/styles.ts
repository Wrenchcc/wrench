import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const Header = styled.View`
  height: 60;
  padding-left: 20;
  padding-right: 20;
  flex-direction: row;
`

export const OpenAlbums = styled(UiTouchable)`
  flex-direction: row;
  align-items: center;
  max-width: 45%;
`
