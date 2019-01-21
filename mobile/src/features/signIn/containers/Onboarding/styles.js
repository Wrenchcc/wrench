import styled from 'styled-components'
import { TAB_HEIGHT } from 'navigation/constants'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
  background-color: ${COLORS.DARK};
  padding-bottom: ${TAB_HEIGHT};
`

export const Image = styled.ImageBackground`
  margin: ${props => `${props.gutter / 2}px`}
  height: ${props => props.size}
  width: ${props => props.size}
  border-width: 3px;
  border-color: ${props => (props.selected ? COLORS.WHITE : 'transparent')}
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
`

export const Cell = styled.View`
  width: 50%;
`

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.selected ? 'rgba(000, 000, 000, 0.6)' : 'rgba(000, 000, 000, 0.2)'};
`
