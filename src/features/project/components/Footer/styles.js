import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { isIphoneX } from 'utils/platform'

export const Base = styled.View`
  padding: 20px 20px ${isIphoneX ? 50 : 20}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${COLORS.WHITE},
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

`
