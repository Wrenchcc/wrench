import styled from 'styled-components'
import Touchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const HEIGHT = 40
export const TOP = 10

export const Button = styled(Touchable)`
  height: ${HEIGHT};
  background: ${COLORS.DARK}
  border-radius: ${HEIGHT / 2};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 22;
  padding-right: 22;
 
`
