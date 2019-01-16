import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const Base = styled(UiTouchable)`
  flex-direction: row;
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 20;
  padding-right: 20;
`

export const Content = styled.View`
  margin-left: 10;
  flex: 1;
`

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
