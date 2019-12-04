import styled from 'styled-components'
import UiText from 'ui/Text'
import UiIcon from 'ui/Icon'

export const Information = styled.View`
  margin-top: 50px;
`

export const ChangeAvatar = styled.View`
  position: relative;
`

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  border-radius: 60px;
  background-color: rgba(000, 000, 000, 0.3);
  top: 0px;
  left: 0px;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
`

export const Row = styled.View`
  margin-top: ${props => (props.first ? 30 : 0)}px;
`

export const Counter = styled(UiText)`
  position: absolute;
  right: 0px;
  top: 20px;
`

export const CloseIcon = styled(UiIcon)`
  position: absolute;
  right: 0;
  top: 22;
`
