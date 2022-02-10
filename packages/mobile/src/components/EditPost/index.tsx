import React, { useState, useCallback } from 'react'
import { useEditPostMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, ScrollView, useNavigation } from 'navigation'
import { ActivityIndicator, Text, Carousel } from 'ui'
import { Content, Input } from './styles'

function EditPost({ post }) {
  const { t } = useTranslation('edit-post')
  const [isSaving, setIsSaving] = useState(false)
  const [caption, setCaption] = useState(post.caption)
  const [files, setFiles] = useState(post.files)

  const [editPost] = useEditPostMutation()
  const { dismissEditPost } = useNavigation()

  const handleRemove = useCallback(
    (id) => {
      setFiles({
        edges: files.edges.filter((item) => item.node.id !== id),
      })
    },
    [files]
  )

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    console.log(files)

    await editPost({
      variables: {
        id: post.id,
        input: {
          collectionId: post?.collection?.id,
          caption,
          files: files.edges.map(({ node }) => node.id),
        },
      },
    })

    setIsSaving(false)
    dismissEditPost()
  }, [post, editPost, caption, files])

  return (
    <Page
      disableAnimation
      headerTitle={t('headerTitle')}
      keyboardVerticalOffset={20}
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
    >
      <ScrollView paddingHorizontal={0}>
        <Content>
          <Carousel files={files} onRemove={handleRemove} />

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
        </Content>
      </ScrollView>
    </Page>
  )
}

export default EditPost
