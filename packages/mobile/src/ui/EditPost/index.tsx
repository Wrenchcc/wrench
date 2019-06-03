import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { editPost } from 'graphql/mutations/post/editPost'
import { Input } from './styles'

type Props = {
  color?: string
  editPost: func
  hasChanged: func
  post?: object
  onSubmit: func
}

function EditPost({ post, color, onSubmit, hasChanged, editPost }: Props) {
  const [value, setValue] = useState(post.caption)
  const { t } = useTranslation()

  const handleEdit = useCallback(
    value => {
      hasChanged(value.trim() !== post.caption)
      setValue(value)
    },
    [value, post]
  )

  const handleSubmit = useCallback(() => {
    onSubmit()

    editPost(post, {
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
