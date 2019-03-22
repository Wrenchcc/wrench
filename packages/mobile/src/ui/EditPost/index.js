import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function EditPost({ text, color, onSubmit, hasChanged }) {
  const [value, setValue] = useState(text)

  const handleEdit = value => {
    hasChanged(value.trim() !== text)
    setValue(value)
  }

  return (
    <Input
      autoFocus
      multiline
      returnKeyType="done"
      noBorder
      color={color}
      scrollEnabled={false}
      onChangeText={handleEdit}
      value={value}
      onSubmitEditing={onSubmit}
    />
  )
}

EditPost.propTypes = {
  color: PropTypes.string,
  hasChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
}

export default EditPost
