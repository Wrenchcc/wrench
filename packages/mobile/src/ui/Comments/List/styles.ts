import styled from 'styled-components'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`

export const Comment = styled(UiText)`
  flex: 1;
`

export const LoadMore = styled(UiTouchable)`
  margin-top: 5px;
`
