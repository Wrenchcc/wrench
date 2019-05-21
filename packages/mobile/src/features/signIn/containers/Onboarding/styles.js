import styled from 'styled-components'
import { TAB_HEIGHT } from 'navigation/constants'
import { COLORS } from 'ui/constants'
import FastImage from 'react-native-fast-image'

export const Base = styled.View`
  flex: 1;
  background-color: ${COLORS.DARK};
  padding-bottom: ${TAB_HEIGHT};
`

export const Image = styled(FastImage)`
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
  margin: ${props => `${props.gutter / 2}px`};
  background: transparent;
  border-width: 3px;
  border-color: ${props => (props.selected ? COLORS.WHITE : 'transparent')};
  height: ${props => props.height - props.gutter / 2};
  width: ${props => props.width - props.gutter / 2};
`

export const Picture = styled.View`
  height: ${props => props.height};
  width: ${props => props.width};
`

export const Cell = styled.View`
  width: 50%;
`

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: -3;
  bottom: -3;
  left: 0;
  background-color: ${props => props.selected ? 'rgba(000, 000, 000, 0.6)' : 'rgba(000, 000, 000, 0.2)'};
`
