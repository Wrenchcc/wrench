import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const TakePicture = styled.TouchableOpacity`
  width: 60;
  height: 60;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 60;
  position: absolute;
  align-self: center;
  bottom: 20;
`
