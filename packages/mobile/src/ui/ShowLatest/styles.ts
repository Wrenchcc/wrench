import styled from 'styled-components'
import Touchable from 'ui/Touchable'

export const HEIGHT = 40
export const TOP = 10

export const Button = styled(Touchable)`
  height: ${HEIGHT}px;
  background: ${props => props.theme.colors.inverse}
  border-radius: ${HEIGHT / 2}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 22px;
  padding-right: 22px;

`
