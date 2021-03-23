import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { useCollectPostsMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { omit, isEmpty } from 'rambda'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { FlatList, useNavigation } from 'navigation'
import { Icon, Touchable, Text, ActivityIndicator } from 'ui'
import { close } from 'images'
import { Cell, Picture, Image } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

function AddPostToCollection({ collectionId, projectId }) {
  const { t } = useTranslation('add-post-to-collection')
  const [items, setItems] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const { dismissModal } = useNavigation()
  const [collectPosts] = useCollectPostsMutation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['project', 'posts'])(ProjectDocument, {
    fetchPolicy: 'network-only',
    variables: {
      id: projectId,
      first: 10,
    },
  })

  const toggleSelection = (item) => {
    if (items[item.node.id]) {
      setItems(omit([item.node.id]))
    } else {
      setItems({
        ...items,
        [item.node.id]: item,
      })
    }
  }

  const isComplete = () => {
    if (isEmpty(items)) {
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    setIsSaving(true)

    const ids = Object.keys(items).map((postId) => ({ postId }))

    try {
      await collectPosts({
        variables: {
          projectId,
          collectionId,
          input: ids,
        },
        update(cache) {
          cache.modify({
            fields: {
              collections(existingCollectionsRefs = {}) {
                return {
                  ...existingCollectionsRefs,
                  edges: [
                    ...ids.map(({ postId }) => ({
                      cursor: '',
                      node: {
                        __ref: `Post:${postId}`,
                      },
                    })),
                    ...existingCollectionsRefs.edges,
                  ],
                }
              },
            },
          })
        },
      })
    } catch {
      setIsSaving(false)
    }

    dismissModal()
    setIsSaving(false)
  }

  const renderItem = ({ item }) => {
    return (
      <Cell key={item.node.id}>
        <Touchable onPress={() => toggleSelection(item)}>
          <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
            <Image
              selected={items[item.node.id]}
              source={item?.node.files.edges[0].node}
              gutter={GUTTER}
              width={ITEM_SIZE}
              height={ITEM_SIZE}
            />
          </Picture>
        </Touchable>
      </Cell>
    )
  }
  return (
    // <Page
    //   headerTitle={t('title')}
    //   headerAnimation={false}
    //   headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
    //   headerRight={
    //     isSaving ? (
    //       <ActivityIndicator />
    //     ) : (
    //       <Text
    //         color="inverse"
    //         medium
    //         opacity={isComplete() ? 1 : 0.5}
    //         disabled={!isComplete()}
    //         onPress={handleSubmit}
    //       >
    //         {t('done')}
    //       </Text>
    //     )
    //   }
    // >
    <FlatList
      data={edges}
      renderItem={renderItem}
      numColumns={2}
      initialNumToRender={10}
      paddingHorizontal={10}
      refetch={refetch}
      fetchMore={fetchMore}
      isRefetching={isRefetching}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
    />
    // </Page>
  )
}

export default AddPostToCollection
