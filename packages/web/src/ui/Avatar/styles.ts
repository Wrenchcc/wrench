// @ts-nocheck
import styled, { css } from 'styled-components'
import { COLORS } from '../constants'

export const Base = styled.div`
  position: relative;
  display: inline-block;

  ${props =>
    props.isOnline &&
    css`
      &:before {
        background: ${props => props.theme.colors.default};
        width: 12px;
        height: 12px;
        border-radius: 12px;
        content: '';
        position: absolute;
        right: -2px;
        top: -2px;
      }

      &:after {
        background: ${COLORS.GREEN};
        width: 8px;
        height: 8px;
        border-radius: 8px;
        content: '';
        position: absolute;
        right: 0px;
        top: 0px;
      }
    `}
`
