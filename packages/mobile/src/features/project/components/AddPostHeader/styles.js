import styled from 'styled-components'
import { isIphoneX } from 'utils/platform'

export const Top = styled.View`
  position: absolute;
  z-index: 20;
  top: ${isIphoneX ? 50 : 30};
  align-self: center;
  max-width: 170;
`

export const Backdrop = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.active ? '100%' : 0)};
  position: absolute
  z-Index: 5;
  `
