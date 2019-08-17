import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTitle from 'ui/Title'

export const Base = styled.View`
  background: ${COLORS.WHITE};
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 50;
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
`

export const Username = styled(UiTitle)`
  flex: 1;
  padding-right: 15;
`
