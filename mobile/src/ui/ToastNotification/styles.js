import styled from 'styled-components'
import { COLORS, TOTAL_HEADER_HEIGHT } from 'ui/constants'

function mapTypeToColor(type) {
  switch (type) {
    case 'error':
      return COLORS.ORANGE
    case 'success':
      return COLORS.DARK
    default:
      return COLORS.LIGHT_GREY
  }
}

export const Base = styled.View`
  height: ${props => props.height};
  background-color: ${props => mapTypeToColor(props.type)};
  justify-content: center;
  position: absolute;
  top: ${TOTAL_HEADER_HEIGHT};
  left: 0;
  right: 0;
  opacity: 0.98;
`
