// @ts-nocheck
import styled from 'styled-components'
import UiImage from '../Image'
import UiText from '../Text'
import { DEVICE } from '../constants'

export const Base = styled.div`
  width: ${props => props.size}px;
  margin-left: ${props => props.marginLeft || 40}px;
  margin-bottom: ${props => props.marginBottom || 70}px;

  @media ${DEVICE.TABLET} {
    margin-left: 10px;
    width: 180px;
  }
`

export const ProjectName = styled(UiText)`
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`

export const Picture = styled(UiImage)`
  height: ${props => props.size}px;
  width: ${props => props.size}px;

  @media ${DEVICE.TABLET} {
    height: 180px;
    width: 180px;
  }
`
