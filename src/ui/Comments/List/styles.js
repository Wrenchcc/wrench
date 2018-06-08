import styled from 'styled-components'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  flex: 1;
`

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 5;
`

export const Comment = styled(UiText)`
  flex: 1;
`

export const LoadMore = styled(UiTouchable)`
  margin-top: 5;
`
