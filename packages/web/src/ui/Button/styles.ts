// @ts-nocheck
import styled from 'styled-components'
import { FONTS } from '../constants'

export const Base = styled.button`
  font-weight: ${FONTS.MEDIUM};
  cursor: pointer;
  font-size: 15px;
  outline: none;
  height: 40px;
  padding: 0 20px;
  color: ${props => (props.black ? props.theme.colors.default : props.theme.colors.inverse)};
  border: solid 1px ${props => (props.black ? props.theme.colors.default : props.theme.colors.divider)};
  background-color: ${({ black, theme }) => (black ? theme.colors.inverse : theme.colors.default)};
  border-color: ${({ black, theme }) => (black ? theme.colors.inverse : theme.colors.divider)};
`
