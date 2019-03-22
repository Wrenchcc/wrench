import React, { useState } from 'react'
import { Input } from './styles'

function EditPost({ text, color, onSubmit }) {
  const [value, setValue] = useState(text)

  return (
    <Input
      autoFocus
      multiline
      returnKeyType="done"
      noBorder
      color={color}
      scrollEnabled={false}
      onChangeText={setValue}
      value={value}
      onSubmitEditing={() => onSubmit()}
    />
  )
}

export default EditPost
