import styled from 'styled-components'
import { COLORS } from '../../ui/constants'

export const Base = styled.div`
  position: relative;
  width: ${props => (props.active ? '375px' : '290px')};
  transition: 0.15s ease-in-out;
  will-change: transform;
`

export const Field = styled.input`
  background: ${props => (props.inverted ? 'rgb(168, 168, 173, 0.2)' : COLORS.ULTRA_LIGHT_GREY)};
  border: none;
  height: 40px;
  outline: none;
  padding: 0 20px 0 40px;
  color: ${COLORS.GREY};
  font-size: 16px;
  width: 100%;
`

export const Icon = styled.img`
  position: absolute;
  left: 15px;
  top: 13px;
`
