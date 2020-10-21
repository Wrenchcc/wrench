import styled from 'styled-components/native'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'

export const Base = styled(Touchable)`
  width: 60px;
`

export const Text = styled(UiText)`
  margin-top: 8px;
`

export const Placeholder = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${(props) => props.placeholderColor || props.theme.colors.placeholder};
`

export const Item = styled.View`
  height: 60px;
`

export const ActivityIndicatorWrapper = styled.View`
  position: absolute;
  z-index: 1;
  height: 60px;
  width: 60px;
  justify-content: center;
`

export const Overlay = styled.View`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${(props) => (props.selected ? 'rgba(000, 000, 000, 0.2)' : 'transparent')};
  z-index: 1;
  border-width: 2px;
  border-color: ${(props) => (props.selected ? 'white' : 'transparent')}; ;
`
