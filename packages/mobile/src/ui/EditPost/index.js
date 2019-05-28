import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { editPost } from 'graphql/mutations/post/editPost'
import { Input } from './styles'

function EditPost({ post, color, onSubmit, hasChanged, editPost }) {
  const [value, setValue] = useState(post.caption)
  const { t } = useTranslation()

  const handleEdit = value => {
    hasChanged(value.trim() !== post.caption)
    setValue(value)
  }

  const handleSubmit = () => {
    onSubmit()

    editPost(post, {
      caption: value,
    })
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
      onSubmitEditing={handleSubmit}
      placeholder={t('EditPost:placeholder')}
    />
  )
}

EditPost.propTypes = {
  color: PropTypes.string,
  editPost: PropTypes.func.isRequired,
  hasChanged: PropTypes.func.isRequired,
  post: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

export default editPost(EditPost)
