import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiFollow from 'ui/Follow'

export const GUTTER = 10
export const SIZE = 120
export const SNAP_INTERVAL = SIZE + GUTTER // Card size

export const Base = styled.View`
  margin-top: 40;
  background-color: ${COLORS.ULTRA_LIGHT_GREY};
  margin-left: -20;
  margin-right: -20;
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
`

export const Follow = styled(UiFollow)`
  position: absolute;
  top: 80;
  left: 10;
  right: 10;
  width: 100;
  height: 30;
  padding-left: 5;
  padding-right: 5;
`
