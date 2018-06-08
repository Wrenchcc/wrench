import styled from 'styled-components'
import isIphoneX from 'utils/isIphoneX'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
  background: ${COLORS.DARK};
`

export const Top = styled.View`
  z-index: 100;
  position: absolute;
  width: 100%;
`

export const Edit = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${isIphoneX() ? 40 : 20};
`

export const Overlay = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`

export const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`
