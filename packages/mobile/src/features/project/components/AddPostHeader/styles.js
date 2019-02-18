import styled from 'styled-components'
import { isIphoneX } from 'utils/platform'

export const Top = styled.View`
  position: absolute;
  z-index: 20;
  top: ${isIphoneX ? 50 : 20};
  align-self: center;
`

export const Backdrop = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.active ? '100%' : 0)};
  position: absolute
  z-Index: 5;
  `
