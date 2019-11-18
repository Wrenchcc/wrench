// @ts-nocheck
import styled from 'styled-components'

export const Base = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 1px;
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
`

export const Progress = styled.div`
  display: block;
  transition: width 200ms ease-in-out;
  width: ${props => props.progress || 0}%;
  height: 3px;
  background-color: white;
  animation: progressBar 0.4s ease;
`
