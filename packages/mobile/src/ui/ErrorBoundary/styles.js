import styled from 'styled-components'
import { animated } from 'react-spring/renderprops'
import { COLORS, TOTAL_HEADER_HEIGHT } from 'ui/constants'

export const Base = animated(styled.View`
  background-color: ${COLORS.RED};
  justify-content: center;
  position: absolute;
  top: ${TOTAL_HEADER_HEIGHT};
  left: 0;
  right: 0;
  opacity: 0.96;
`)
