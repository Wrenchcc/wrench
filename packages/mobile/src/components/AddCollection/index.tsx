import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddCollectionMutation, CollectionFragmentDoc } from '@wrench/common'
import { store } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { keyboardHeight } from 'utils/platform'
import { Icon, Title } from 'ui'
import { Base, Center, Input, Text, Content, Inner } from './styles'
import { add } from 'images'

const HALFPANEL_HEIGHT = 164

function Form({ projectId, disableModal }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const { dismissHalfpanel, showModal } = useNavigation()
  const [addCollection] = useAddCollectionMutation()

  const handleOnSubmit = async () => {
    dismissHalfpanel()

    const { data } = await addCollection({
      variables: {
        name,
        projectId,
      },
      update(cache, { data: { addCollection } }) {
        cache.modify({
          fields: {
            projectCollections(existingCollectionsRefs = {}) {
              const newCollectionRef = cache.writeFragment({
                data: addCollection,
                fragment: CollectionFragmentDoc,
              })

              return {
                ...existingCollectionsRefs,
                edges: [
                  {
                    node: newCollectionRef,
                  },
                  ...existingCollectionsRefs.edges,
                ],
              }
            },
          },
        })
      },
    })

    if (!disableModal) {
      const collectionId = data.addCollection.id

      store.collection.toggleCollection(collectionId)

      showModal(SCREENS.ADD_POST_TO_COLLECTION, {
        collectionId,
        projectId,
      })
    }
  }

  return (
    <Content>
      <Title>{t('AddCollection:title')}</Title>

      <Inner>
        <Input
          placeholder={t('AddCollection:placeholder')}
          enablesReturnKeyAutomatically
          autoFocus
          returnKeyType="done"
          onChangeText={setName}
          onSubmitEditing={handleOnSubmit}
        />

        {name.length > 0 && (
          <Text fontSize={15} medium onPress={handleOnSubmit}>
            {t('AddCollection:done')}
          </Text>
        )}
      </Inner>
    </Content>
  )
}

function AddCollection({ projectId, style = {}, disableModal }) {
  const { t } = useTranslation()
  const { showHalfpanel } = useNavigation()

  const handleHalfPanel = useCallback(
    () =>
      showHalfpanel({
        height: HALFPANEL_HEIGHT + keyboardHeight,
        renderContent: () => <Form projectId={projectId} disableModal={disableModal} />,
      }),
    [showHalfpanel]
  )

  return (
    <Base style={style}>
      <Center>
        <Icon source={add} onPress={handleHalfPanel} />
      </Center>
      <Text fontSize={12}>{t('AddCollection:add')}</Text>
    </Base>
  )
}

export default AddCollection
