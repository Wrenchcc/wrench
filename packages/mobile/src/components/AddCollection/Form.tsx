import React, { useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAddCollectionMutation, CollectionFragmentDoc } from '@wrench/common'
import { store } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { Title, Input, Text } from 'ui'

const styles = {
  input: {
    flex: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
  content: {
    marginTop: 20,
  },
}

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

    const collectionId = data.addCollection.id

    store.collection.toggleCollection(collectionId)

    if (!disableModal) {
      showModal(SCREENS.ADD_POST_TO_COLLECTION, {
        collectionId,
        projectId,
      })
    }
  }

  return (
    <View style={styles.content}>
      <Title>{t('title')}</Title>

      <View style={styles.inner}>
        <Input
          style={styles.input}
          placeholder={t('placeholder')}
          enablesReturnKeyAutomatically
          autoFocus
          returnKeyType="done"
          onChangeText={setName}
          onSubmitEditing={handleOnSubmit}
        />

        {name.length > 0 && (
          <Text fontSize={15} medium onPress={handleOnSubmit} style={styles.text}>
            {t('done')}
          </Text>
        )}
      </View>
    </View>
  )
}

export default Form
