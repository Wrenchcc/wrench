import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  width: 60;
  margin-left: ${props => (props.first ? 20 : 5)};
  margin-right: ${props => (props.last ? 20 : 5)};
`

export const Item = styled.View`
  width: 60;
  height: 60;
  border-radius: 60;
  border-width: 2.5;
  border-color: ${props => (props.seen ? COLORS.DIVIDER : COLORS.DARK)};
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
`

export const Image = styled(UiImage)``

export const List = styled.ScrollView`
  margin-bottom: 40;
`
