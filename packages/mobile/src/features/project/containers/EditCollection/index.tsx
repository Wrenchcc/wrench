import React, { useState, useCallback } from 'react'
import { useDeleteCollectionMutation, useEditCollectionMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import NativeShare from 'react-native-share'
import { ScrollView, Page, useNavigation, SCREENS } from 'navigation'
import { ActivityIndicator, Text, Title, Icon, Input, SelectionItem } from 'ui'
import { close } from 'images'
import { Inner } from './styles'

function EditCollection({ id, name, projectId, projectSlug, slug, onDelete }) {
  const { t } = useTranslation('edit-collection')
  const [isSaving, setIsSaving] = useState(false)
  const { dismissModal, showModal } = useNavigation()
  const [deleteCollection] = useDeleteCollectionMutation()
  const [editCollection] = useEditCollectionMutation()

  const [title, setTitle] = useState(name)

  const onChangeText = useCallback((text) => setTitle(text), [])

  const navigateToAddPosts = useCallback(
    () =>
      showModal(SCREENS.ADD_POST_TO_COLLECTION, {
        collectionId: id,
        projectId,
      }),
    []
  )

  const handleShare = useCallback(() => {
    NativeShare.open({
      url: `https://wrench.cc/project/${projectSlug}/collection/${slug}`,
    }).catch(() => {})
  }, [])

  const handleDismiss = () => dismissModal()

  const handleDone = async () => {
    setIsSaving(true)

    await editCollection({
      variables: {
        id,
        input: {
          name: title,
        },
      },
    })

    dismissModal()
    setIsSaving(false)
  }

  const handleDelete = () => {
    deleteCollection({
      variables: {
        id,
        projectId,
      },
      update(cache) {
        cache.modify({
          fields: {
            projectCollections(existingCollectionsRefs = {}, { readField }) {
              return {
                ...existingCollectionsRefs,
                edges: existingCollectionsRefs.edges.filter(
                  ({ node }) => id !== readField('id', node)
                ),
              }
            },
          },
        })
      },
    })

    dismissModal()
    onDelete()
  }

  return (
    <Page
      headerTitle={name}
      disableAnimation
      headerLeft={<Icon onPress={handleDismiss} source={close} />}
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Text medium onPress={handleDone}>
            {t('done')}
          </Text>
        )
      }
    >
      <ScrollView>
        <>
          <Inner>
            <Title>{t('title')}</Title>
            <Input
              placeholder={t('placeholder')}
              value={title}
              onChangeText={onChangeText}
              color="dark"
              onSubmitEditing={() => {}}
              returnKeyType="done"
            />

            <SelectionItem title={t('share:share')} onPress={handleShare} />
            <SelectionItem title={t('add')} onPress={navigateToAddPosts} />
            <SelectionItem important title={t('delete')} onPress={handleDelete} />
          </Inner>
        </>
      </ScrollView>
    </Page>
  )
}

export default EditCollection
