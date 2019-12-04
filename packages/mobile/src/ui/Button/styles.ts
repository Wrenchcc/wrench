import styled from 'styled-components'
import { toUpper } from 'ramda'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  background-color: ${({ background }) => (background ? COLORS[toUpper(background)] : COLORS.DARK)};
  height: ${props => (props.small ? 30 : 60)}px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`
