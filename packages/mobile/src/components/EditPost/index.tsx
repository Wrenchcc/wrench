import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, GET_POST, EDIT_POST_MUTATION } from 'gql'
import { Page, ScrollView, dismissEditPost } from 'navigation'
import { Text, Carousel } from 'ui'
import { Content, Input } from './styles'

function EditPost({ id }) {
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [caption, setCaption] = useState()
  const [editPost] = useMutation(EDIT_POST_MUTATION)

  const { loading, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  })

  useEffect(() => {
    if (data) {
      setCaption(data.post.caption)
    }
  }, [data])

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    await editPost({
      variables: {
        id,
        input: {
          caption,
        },
      },
    })

    setIsSaving(false)
    dismissEditPost()
  }, [id, editPost, caption])

  if (loading) {
    return null
  }

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
          <Carousel files={data.post.files} />
        </Content>
      </ScrollView>
    </Page>
  )
}

export default EditPost
