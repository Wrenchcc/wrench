// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from '../constants'

export const Base = styled.div`
  border-radius: ${(props) => props.borderRadius || 0}px;
  background-color: ${(props) => props.placeholderColor || props.theme.colors.placeholder};
  overflow: hidden;
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
`

export const Picture = styled.picture`
  width: 100%;
  height: 100%;
  display: block;

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`
