import React, { useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { hasNotch } from 'utils/platform'
import { usePaginatedQuery, FilesDocument } from '@wrench/common'
import { useNavigation } from 'navigation'
import { Icon, InfiniteList, Image } from 'ui'
import { arrowLeft } from 'images'
import { NAVIGATION, SCREENS } from 'navigation/constants'
import { BackButton, Item } from './styles'

const { width } = Dimensions.get('window')
const NUM_COLUMNS = 4

const ITEM_SIZE = width / NUM_COLUMNS - 4

function Inspiration() {
  const { navigateBack, navigate } = useNavigation()

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const handleNavigate = useCallback(
    (postId) => {
      navigate(SCREENS.POST, {
        postId,
      })
    },
    [navigateBack]
  )

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['files'])(FilesDocument, {
    variables: {
      first: 48,
    },
  })

  const renderItem = ({ item }) => (
    <Item onPress={() => handleNavigate(item.node.postId)} size={ITEM_SIZE}>
      <Image source={item.node} width={ITEM_SIZE} height={ITEM_SIZE} />
    </Item>
  )

  return (
    <>
      <BackButton onPress={handleNavigationBack}>
        <Icon source={arrowLeft} onPress={handleNavigationBack} />
      </BackButton>

      <View style={{ flex: 1, marginTop: hasNotch ? -NAVIGATION.STATUS_BAR_HEIGHT : 0 }}>
        <InfiniteList
          numColumns={NUM_COLUMNS}
          loaderInset={0}
          paddingHorizontal={0}
          data={edges}
          isFetching={isFetching}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          hasNextPage={hasNextPage}
          refetch={refetch}
          renderItem={renderItem}
        />
      </View>
    </>
  )
}

export default Inspiration
