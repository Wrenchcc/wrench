// @ts-nocheck
import React from 'react'
import styled from 'styled-components'

const Base = styled.img`
  border-radius: 80px;
  height: 80px;
  width: 80px;
  overflow: none;
`

function Avatar({ src }) {
  return <Base src={src} />
}

export default Avatar
