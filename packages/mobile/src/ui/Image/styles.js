import styled from 'styled-components'
import RNFastImage from 'react-native-fast-image'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  background-color: ${({ placeholderColor }) => placeholderColor || COLORS.ULTRA_LIGHT_GREY};
  overflow: hidden;
`

export const FastImage = styled(RNFastImage)`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`
