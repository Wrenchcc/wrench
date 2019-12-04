import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { TOAST_TYPES } from 'utils/enums'

function mapTypeToColor(type) {
  switch (type) {
    case TOAST_TYPES.WARNING:
      return COLORS.RED
    case TOAST_TYPES.SPAM:
    case TOAST_TYPES.ERROR:
      return COLORS.ORANGE
    case TOAST_TYPES.SUCCESS:
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
  height: 40px;
`
