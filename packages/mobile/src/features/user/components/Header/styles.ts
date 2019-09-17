import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  background: ${COLORS.WHITE};
  padding-bottom: 45;
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
`

export const Inner = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Username = styled.View`
  flex: 1;
  padding-right: 10;
`

export const Info = styled.View`
  padding-top: 20;
`
