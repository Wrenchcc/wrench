import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { isIphoneX } from 'utils/platform'

export const Base = styled.View`
  padding: 0 20px 20px 20px;
  padding-bottom: ${isIphoneX ? 40 : 10};
  height: ${isIphoneX ? 100 : 70};
  position: absolute;
  bottom: ${isIphoneX ? -20 : 0};
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
