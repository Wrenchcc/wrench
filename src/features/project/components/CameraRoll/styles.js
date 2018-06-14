import styled from 'styled-components'
import UiImage from 'ui/Image'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

export const Base = styled.TouchableOpacity`
  padding-top: ${props => (props.paddingTop ? HEADER_HEIGHT : 0)};
  flex: 1;
  background-color: ${COLORS.DARK};
`

export const Cell = styled.View`
  width: 50%;
`

export const Image = styled(UiImage)`
  height: ${props => props.height}
  border-width: 3px;
  border-color: ${props => (props.selected ? COLORS.WHITE : 'transparent')}
`

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => (props.selected ? 'rgba(000, 000, 000, 0.2)' : 'transparent')};
`
