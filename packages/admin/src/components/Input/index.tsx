// @ts-nocheck
import React from 'react'
import styled from 'styled-components'

const Field = styled.input`
  width: 100%;
  border-top-width: initial;
  border-right-width: initial;
  border-left-width: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  height: 60px;
  font-size: 17px;
  color: rgb(0, 0, 0);
  background: none;
  border-style: none none solid;
  border-image: initial;
  border-bottom: 1px solid rgb(230, 231, 233);
  outline: none;
  max-width: 650px;
  margin: 0 auto;
  display: block;
`

function Input({ value, placeholder, onChange }) {
  return <Field value={value} placeholder={placeholder} onChange={onChange} />
}

export default Input
