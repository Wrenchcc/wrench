import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  background: ${COLORS.WHITE};
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20;
  padding-bottom: 50;
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
`

export const Username = styled.View``
