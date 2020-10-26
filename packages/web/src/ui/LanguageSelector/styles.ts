import styled from 'styled-components'
import { FONTS } from '../constants'

export const Base = styled.div`
  display: block;
  height: 40px;
  position: relative;
`

export const Select = styled.select`
  font-weight: ${FONTS.MEDIUM};
  font-family: 'Inter var', system-ui, sans-serif;
  background: none;
  display: block;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.divider};
  color: ${(props) => props.theme.colors.inverse};
  padding: 0 20px;
  appearance: none;
  padding: 0 40px 0 20px;
`
