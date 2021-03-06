import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddCollectionMutation, CollectionFragmentDoc } from '@wrench/common'
import { store } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { Title } from 'ui'
import { Input, Text, Content, Inner } from './styles'

function Form({ projectId, disableModal }) {
  const { t } = useTranslation('add-collection')
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
      <Title>{t('title')}</Title>

      <Inner>
        <Input
          placeholder={t('placeholder')}
          enablesReturnKeyAutomatically
          autoFocus
          returnKeyType="done"
          onChangeText={setName}
          onSubmitEditing={handleOnSubmit}
        />

        {name.length > 0 && (
          <Text fontSize={15} medium onPress={handleOnSubmit}>
            {t('done')}
          </Text>
        )}
      </Inner>
    </Content>
  )
}

export default Form
