import styled from 'styled-components'
import { COLORS } from 'ui/constants'

function mapTypeToColor(type) {
  switch (type) {
    case 'warning':
      return COLORS.RED
    case 'error':
      return COLORS.ORANGE
    case 'success':
      return COLORS.DARK
    default:
      return COLORS.LIGHT_GREY
  }
}

export const Base = styled.View`
  background-color: ${props => mapTypeToColor(props.type)};
  justify-content: center;
  opacity: 0.96;
  width: 100%;
  height: 40;
`
