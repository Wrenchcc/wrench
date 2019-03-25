import styled from 'styled-components'
import { isNotchIPhone } from 'utils/platform'

export const Base = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  padding-top: ${(isNotchIPhone && 60) || 35};
`
