import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const Base = styled(UiTouchable)`
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
`

export const Content = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
`

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
