import React, { useState } from 'react'
import { Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { omit } from 'rambda'
import { usePaginatedQuery, ProjectDocument } from '@wrench/common'
import { FlatList, Page, useNavigation } from 'navigation'
import { Icon, Touchable, Text } from 'ui'
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
      first: 8,
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
    if (items) {
      return true
    }

    return false
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    // const interestedIn = Object.keys(items).map((id) => ({ id }))

    // await editUser({
    //   variables: {
    //     input: {
    //       interestedIn,
    //     },
    //   },
    // })

    // setTimeout(
    //   settingsPage
    //     ? () => {
    //         navigateBack()
    //         setIsSaving(false)
    //       }
    //     : () => {
    //         navigate(SCREENS.PROJECT_SUGGESTIONS)
    //         setIsSaving(false)
    //       },
    //   100
    // )
  }

  const renderItem = ({ item }) => (
    <Cell key={item.node.id}>
      <Touchable onPress={() => toggleSelection(item)}>
        <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
          <Image
            selected={items[item.node.id]}
            source={{ uri: item.node.files.edges[0].node.uri }}
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
            Done
          </Text>
        )
      }
    >
      <FlatList
        data={edges}
        renderItem={renderItem}
        numColumns={2}
        initialNumToRender={8}
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
