import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const Base = styled(UiTouchable)`
  background-color: ${props => props.theme.colors[props.color] || props.theme.colors.default};
  height: ${props => (props.small ? 30 : 60)}px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`
