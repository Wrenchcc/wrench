import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export const Base = styled.SafeAreaView`
  margin: 10px 20px 20px 20px;
  height: ${hasNotch ? 60 : 30};
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
