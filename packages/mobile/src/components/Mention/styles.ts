import styled from 'styled-components'
import { NAVIGATION } from 'navigation/constants'
import { keyboardHeight } from 'utils/platform'

const INPUT_HEIGHT = 60

export const Base = styled.View`
  background-color: ${(props) => props.theme.colors.default};
  bottom: ${keyboardHeight + INPUT_HEIGHT}px;
  left: 0;
  position: absolute;
  top: ${NAVIGATION.STATUS_BAR_HEIGHT}px;
  width: 100%;
  z-index: 100;
`
