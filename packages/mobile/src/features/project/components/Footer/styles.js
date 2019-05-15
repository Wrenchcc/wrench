import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  padding: 0 20px 20px 20px;
  height: ${hasNotch ? 80 : 60};
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
