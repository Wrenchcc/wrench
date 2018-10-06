import styled from 'styled-components'
import { isIphoneX } from 'utils/platform'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
  background: ${COLORS.DARK};
`

export const Edit = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${isIphoneX ? 40 : 20};
`

export const Inner = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`

export const Overlay = styled.View`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`
