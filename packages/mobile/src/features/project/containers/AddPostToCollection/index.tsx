import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { useCollectPostsMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { omit, isEmpty } from 'rambda'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { FlatList, Page, useNavigation } from 'navigation'
import { Icon, Image, Touchable, Text, ActivityIndicator } from 'ui'
import { close } from 'images'
import PlatformColor from 'ui/PlatformColor'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

const styles = {
  image: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    background: 'transparent',
    borderWidth: 3,
  },
  picture: {
    width: ITEM_SIZE,
    heigh: ITEM_SIZE,
  },
  cell: {
    width: '50%',
  },
}

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
      <View key={item.node.id} style={styles.cell}>
        <Touchable onPress={() => toggleSelection(item)}>
          <View style={styles.picture}>
            <Image
              source={item?.node.files.edges[0].node}
              style={[
                styles.image,
                {
                  margin: GUTTER / 2,
                  borderColor: items[item.node.id] ? PlatformColor.inverse : 'transparent',
                  height: ITEM_SIZE - GUTTER / 2,
                  width: ITEM_SIZE - GUTTER / 2,
                },
              ]}
            />
          </View>
        </Touchable>
      </View>
    )
  }
  return (
    <Page
      headerTitle={t('title')}
      disableAnimation
      headerLeft={<Icon source={close} onPress={dismissModal} color="dark" />}
      headerRight={
        isSaving ? (
          <ActivityIndicator />
        ) : (
          <Text
            color="inverse"
            medium
            opacity={isComplete() ? 1 : 0.5}
            disabled={!isComplete()}
            onPress={handleSubmit}
          >
            {t('done')}
          </Text>
        )
      }
    >
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
    </Page>
  )
}

export default AddPostToCollection
