// @ts-nocheck
import React from 'react'
import styled from 'styled-components'

const Base = styled.img`
  border-radius: ${(props) => props.size || 80}px;
  height: ${(props) => props.size || 80}px;
  width: ${(props) => props.size || 80}px;
  overflow: none;
`

function Avatar({ src, size = 80 }) {
  return <Base src={`${src}?w=${size * 3}&h=${size * 3}`} size={size} />
}

export default Avatar
