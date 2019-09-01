import styled from 'styled-components'
import { isIphone, hasNotch } from 'utils/platform'

export const Base = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  top: ${isIphone ? (hasNotch ? 52 : 30) : 10};
  z-index: 100;
  width: 45%;
  position: absolute;
`
