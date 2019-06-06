import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { editPost } from 'graphql/mutations/post/editPost'
import { Input } from './styles'

function EditPost({ post, color, onSubmit, hasChanged, editPost: editPostMutation }) {
  const [value, setValue] = useState(post.caption)
  const { t } = useTranslation()

  const handleEdit = useCallback(
    text => {
      hasChanged(text.trim() !== post.caption)
      setValue(text)
    },
    [value, post]
  )

  const handleSubmit = useCallback(() => {
    onSubmit()

    editPostMutation(post, {
      caption: value,
    })
  }, [post, value, onSubmit])

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

export default editPost(EditPost)
