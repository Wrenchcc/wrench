import styled from 'styled-components'
import { COLORS } from '../constants'

export const Base = styled.div`
  border-radius: ${props => props.borderRadius || 0}px;
  background-color: ${props => props.placeholderColor || COLORS.ULTRA_LIGHT_GREY};
  overflow: hidden;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`
