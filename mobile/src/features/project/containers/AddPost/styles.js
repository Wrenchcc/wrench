import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { isIphoneX } from 'utils/platform'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

const { width } = Dimensions.get('window')

export const Base = styled.View`
  flex: 1;
  background: ${COLORS.DARK};
  padding-top: ${HEADER_HEIGHT};
`

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  background: #222;
  padding-bottom: 5;
`

export const Top = styled.View`
  z-index: 100;
  position: absolute;
  width: 100%;
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
