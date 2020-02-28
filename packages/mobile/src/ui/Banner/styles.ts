import styled from 'styled-components'
import { TOAST_TYPES } from 'utils/enums'

function mapTypeToColor(type, colors) {
  switch (type) {
    case TOAST_TYPES.WARNING:
      return colors.warning
    case TOAST_TYPES.SPAM:
    case TOAST_TYPES.ERROR:
      return colors.error
    case TOAST_TYPES.SUCCESS:
      return colors.inverse
    default:
      return colors.subtle
  }
}

export const Base = styled.View`
  background-color: ${props => mapTypeToColor(props.type, props.theme.colors)};
  justify-content: center;
  opacity: 0.96;
  width: 100%;
  height: 40px;
`
