import styled from 'styled-components'
import UiText from 'ui/Text'
import UiIcon from 'ui/Icon'

export const Information = styled.View`
  margin-top: 50;
`

export const ChangeAvatar = styled.View`
  position: relative;
`

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  border-radius: 60;
  background-color: rgba(000, 000, 000, 0.3);
  top: 0;
  left: 0;
  width: 120;
  height: 120;
  justify-content: center;
  align-items: center;
`

export const Row = styled.View`
  margin-top: ${props => (props.first ? 30 : 0)};
`

export const Counter = styled(UiText)`
  position: absolute;
  right: 0;
  top: 20;
`

export const CloseIcon = styled(UiIcon)`
  position: absolute;
  right: 0;
  top: 22;
`
