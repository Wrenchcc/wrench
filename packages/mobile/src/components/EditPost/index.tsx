import React, { useState, useCallback } from 'react'
import { useEditPostMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { ScrollView, useNavigation } from 'navigation'
import { Header, ActivityIndicator, Text, Carousel } from 'ui'
import { Content, Input } from './styles'

function EditPost({ post }) {
  const { t } = useTranslation('edit-post')
  const [isSaving, setIsSaving] = useState(false)
  const [caption, setCaption] = useState(post.caption)
  const [editPost] = useEditPostMutation()

  const { dismissEditPost } = useNavigation()

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    await editPost({
      variables: {
        id: post.id,
        input: {
          collectionId: post?.collection.id,
          caption,
        },
      },
    })

    setIsSaving(false)
    dismissEditPost()
  }, [post, editPost, caption])

  return (
    <>
      <Header
        headerTitle={t('headerTitle')}
        headerRight={
          isSaving ? (
            <ActivityIndicator />
          ) : (
            <Text medium onPress={handleSave}>
              {t('save')}
            </Text>
          )
        }
        headerLeft={
          <Text medium onPress={() => dismissEditPost()}>
            {t('cancel')}
          </Text>
        }
      />

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
            onChangeText={(text) => setCaption(text)}
            placeholder={t('placeholder')}
            style={{ marginBottom: 20 }}
          />
          <Carousel files={post.files} />
        </Content>
      </ScrollView>
    </>
  )
}

export default EditPost
