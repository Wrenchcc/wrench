import styled from 'styled-components'
import UiFollow from 'ui/Follow'

export const GUTTER = 10
export const SIZE = 120
export const SNAP_INTERVAL = SIZE + GUTTER // Card size

export const Base = styled.View`
  margin-top: 40px;
  background-color: ${props => props.theme.colors.subtle};
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const Follow = styled(UiFollow)`
  position: absolute;
  top: 80px;
  left: 10px;
  right: 10px;
  width: 100px;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;
`
