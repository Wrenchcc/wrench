import styled from 'styled-components/native'
import { TOAST_TYPES } from 'utils/enums'
import { ThemeInterface } from 'ui/types'

function mapTypeToColor(type: TOAST_TYPES, colors) {
  switch (type) {
    case TOAST_TYPES.WARNING:
      return colors.warning
    case TOAST_TYPES.SPAM:
    case TOAST_TYPES.ERROR:
      return colors.error
    case TOAST_TYPES.SUCCESS:
      return colors.inverse
    default:
      return colors.accent
  }
}

type BaseProps = { type?: TOAST_TYPES; theme: ThemeInterface }

export const Base = styled.View<BaseProps>`
  background-color: ${(props) => mapTypeToColor(props.type, props.theme.colors)};
  justify-content: center;
  opacity: 0.96;
  width: 100%;
  height: 40px;
`
