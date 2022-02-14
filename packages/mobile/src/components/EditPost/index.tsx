import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { useEditPostMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Page, ScrollView, useNavigation } from 'navigation'
import { ActivityIndicator, Text, Carousel, Input } from 'ui'
import { FONTS } from 'ui/constants'

const styles = {
  content: {
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    fontSize: 15,
    lineHeight: 22,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 20,
    fontFamily: FONTS.REGULAR,
    marginBottom: 20,
  },
}

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

  const handleOnChange = useCallback((text) => setCaption(text), [])

  const handleSave = useCallback(async () => {
    setIsSaving(true)

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
        <View style={styles.content}>
          <Carousel files={files} onRemove={handleRemove} />

          <Input
            autoFocus
            multiline
            keyboardType="twitter"
            noBorder
            scrollEnabled={false}
            color="dark"
            value={caption}
            onChangeText={handleOnChange}
            placeholder={t('placeholder')}
            style={styles.input}
          />
        </View>
      </ScrollView>
    </Page>
  )
}

export default EditPost
