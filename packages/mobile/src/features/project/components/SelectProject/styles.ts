import styled from 'styled-components'
import { isIphone } from 'utils/platform'

export const Base = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: ${isIphone ? 52 : 18};
  z-index: 100;
  width: 45%;
  position: absolute;
`

export const Icon = styled.Image`
  margin-left: 10;
`
