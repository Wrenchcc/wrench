import React, { useState, useCallback } from 'react'
import { useDeleteCollectionMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { ScrollView, Page, useNavigation } from 'navigation'
import { ActivityIndicator, Text, Title, Icon, Input, SelectionItem } from 'ui'
import { close } from 'images'
import { Inner } from './styles'

function EditCollection({ id, name, projectId }) {
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const { dismissModal } = useNavigation()
  const [deleteCollection] = useDeleteCollectionMutation()

  const [title, setTitle] = useState(name)

  const onChangeText = useCallback((text) => setTitle(text), [])

  const handleDismiss = () => dismissModal()
  const handleDone = () => dismissModal()
  const handleDelete = () => {
    deleteCollection({
      variables: {
        id,
        projectId,
      },
    })
  }

  return (
    <Page
      headerTitle={name}
      headerAnimation={false}
      headerLeft={<Icon onPress={handleDismiss} source={close} />}
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Text medium onPress={handleDone}>
            {t('EditCollection:done')}
          </Text>
        )
      }
    >
      <ScrollView>
        <>
          <Inner>
            <Title>{t('EditCollection:title')}</Title>
            <Input
              placeholder={t('EditCollection:placeholder')}
              value={title}
              onChangeText={onChangeText}
              color="dark"
              onSubmitEditing={() => {}}
              returnKeyType="done"
            />

            <SelectionItem last title={t('EditCollection:delete')} onPress={handleDelete} />
          </Inner>
        </>
      </ScrollView>
    </Page>
  )
}

export default EditCollection
