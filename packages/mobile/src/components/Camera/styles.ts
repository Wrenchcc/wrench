import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const TakePicture = styled(UiTouchable)`
  width: 60px;
  height: 60px;
  border-width: 3px;
  border-color: ${props => props.theme.colors.white};
  border-radius: 60px;
`

export const Wrapper = styled.View`
  bottom: 20px;
  z-index: 110;
  position: absolute;
  align-self: center;
`
