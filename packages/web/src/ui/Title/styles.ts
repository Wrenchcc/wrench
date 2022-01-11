// @ts-nocheck
import styled from 'styled-components'
import { toUpper } from 'ramda'
import { FONTS, COLORS } from '../constants'

export const Base = styled.h1`
  word-wrap: break-word;
  font-weight: ${FONTS.MEDIUM};
  color: ${(props) => props.theme.colors[props.color] || props.theme.colors.inverse};
  font-size: ${(props) => (props.medium && 48) || (props.large && 68) || props.fontSize || 21}px;
  line-height: ${(props) => `${props.lineHeight ? `${props.lineHeight}px` : 'inherit'} `};
`
