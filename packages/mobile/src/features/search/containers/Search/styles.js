import styled from 'styled-components'
import { isIphone, hasNotch } from 'utils/platform'

const TOP = isIphone ? (hasNotch ? 60 : 35) : 15

export const Base = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  padding-top: ${TOP};
`
