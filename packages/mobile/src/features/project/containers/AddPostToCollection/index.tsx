import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { useCollectPostsMutation, ProjectCollectionsDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { omit, isEmpty } from 'rambda'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { FlatList, Page, useNavigation } from 'navigation'
import { Icon, Touchable, Text, ActivityIndicator } from 'ui'
import { close } from 'images'
import { Cell, Picture, Image } from './styles'

const { width } = Dimensions.get('window')

const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

function AddPostToCollection({ collectionId, projectId }) {
  const [items, setItems] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const { t } = useTranslation()
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

    const posts = Object.keys(items).map((postId) => ({ postId }))

    try {
      await collectPosts({
        variables: {
          projectId,
          collectionId,
          input: posts,
        },
        update: (cache, { data: { collectPosts } }) => {
          try {
            const { projectCollections } = cache.readQuery({
              query: ProjectCollectionsDocument,
              variables: {
                projectId,
                first: 8,
              },
            })

            cache.writeQuery({
              query: ProjectCollectionsDocument,
              variables: {
                projectId,
                first: 8,
              },
              data: {
                ...projectCollections,
                projectCollections: {
                  edges: [
                    {
                      __typename: 'CollectionEdge',
                      cursor: 'dW5kZWZpbmVkX19fMjAyMC0wNy0xMCAwOTo0NDowOS4wODcyNTgrMDA=',
                      node: {
                        __typename: 'Collection',
                        cover: {
                          __typename: 'CoverType',
                          uri: null,
                        },
                        id: '9c1316f2-80c3-431e-821b-757abca9b3380',
                        name: 'Cfwefwef',
                      },
                    },
                    ...projectCollections.edges,
                  ],
                },
              },
            })
          } catch (err) {
            console.log(err)
            // logError(err)
          }
        },
      })
    } catch {
      setIsSaving(false)
    }

    dismissModal()
    setIsSaving(false)
  }

  const renderItem = ({ item }) => (
    <Cell key={item.node.id}>
      <Touchable onPress={() => toggleSelection(item)}>
        <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
          <Image
            selected={items[item.node.id]}
            source={item.node.files.edges[0].node}
            gutter={GUTTER}
            width={ITEM_SIZE}
            height={ITEM_SIZE}
          />
        </Picture>
      </Touchable>
    </Cell>
  )

  return (
    <Page
      headerTitle={t('AddPostToCollection:title')}
      headerAnimation={false}
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
            {t('AddPostToCollection:done')}
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
