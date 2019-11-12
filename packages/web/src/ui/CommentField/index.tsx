import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from './styles'

function CommentField() {
  const { t } = useTranslation()
  return <Input placeholder={t('CommentField:placeholder')} />
}

export default CommentField
