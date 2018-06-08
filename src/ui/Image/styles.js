import styled from 'styled-components'
import RNFastImage from 'react-native-fast-image'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  border-radius: ${props => props.borderRadius || 0};
  background-color: ${COLORS.BEIGE};
  overflow: hidden;
`

export const FastImage = styled(RNFastImage)`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
`
