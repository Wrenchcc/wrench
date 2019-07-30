import styled from 'styled-components'
import UiImage from 'ui/Image'
import UiTouchable from 'ui/Touchable'

export const Item = styled(UiTouchable)`
  margin-left: ${props => (props.first ? 20 : 5)};
  margin-right: ${props => (props.last ? 20 : 5)};
  width: 60;
  height: 60;
  border-radius: 60;
  border-width: 3;
  border-color: grey;
  justify-content: center;
  align-items: center;
`

export const Image = styled(UiImage)``

export const List = styled.ScrollView`
  margin-bottom: 40;
`
