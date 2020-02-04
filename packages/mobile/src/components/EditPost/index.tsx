import React, { useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useEditPostMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, ScrollView, dismissEditPost } from 'navigation'
import { Text, Carousel } from 'ui'
import { Content, Input } from './styles'

function EditPost({ post }) {
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [caption, setCaption] = useState(post.caption)
  const [editPost] = useEditPostMutation()

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    await editPost({
      variables: {
        id: post.id,
        input: {
          caption,
        },
      },
    })

    setIsSaving(false)
    dismissEditPost()
  }, [post, editPost, caption])

  return (
    <Page
      headerAnimation={false}
      headerTitle={t('EditPost:headerTitle')}
      headerRight={
        isSaving ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text medium onPress={handleSave}>
            {t('EditPost:save')}
          </Text>
        )
      }
      headerLeft={
        <Text medium onPress={() => dismissEditPost()}>
          {t('EditPost:cancel')}
        </Text>
      }
    >
      <ScrollView paddingHorizontal={0}>
        <Content>
          <Input
            autoFocus
            multiline
            keyboardType="twitter"
            noBorder
            scrollEnabled={false}
            color="dark"
            value={caption}
            onChangeText={text => setCaption(text)}
            placeholder={t('EditPost:placeholder')}
            style={{ marginBottom: 20 }}
          />
          <Carousel files={post.files} />
        </Content>
      </ScrollView>
    </Page>
  )
}

export default EditPost
