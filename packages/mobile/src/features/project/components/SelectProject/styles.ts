import styled from 'styled-components'
import { isIphone, hasNotch } from 'utils/platform'

export const Base = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: ${isIphone ? (hasNotch ? 52 : 30) : 18};
  z-index: 100;
  width: 45%;
  position: absolute;
`

export const Icon = styled.Image`
  margin-left: 10;
`
