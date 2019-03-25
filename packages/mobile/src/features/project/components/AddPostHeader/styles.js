import styled from 'styled-components'
import { isNotchIPhone } from 'utils/platform'

export const Top = styled.View`
  position: absolute;
  z-index: 20;
  top: ${isNotchIPhone ? 65 : 45};
  align-self: center;
  justify-content: center;
  max-width: 170;
`

export const Backdrop = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.active ? '100%' : 0)};
  position: absolute
  z-Index: 5;
  `
