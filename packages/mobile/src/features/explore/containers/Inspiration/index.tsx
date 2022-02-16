import React, { useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { usePaginatedQuery, FilesDocument } from '@wrench/common'
import { useNavigation } from 'navigation'
import { Icon, Touchable, InfiniteList, Image } from 'ui'
import { arrowLeft } from 'images'
import { STATUS_BAR_HEIGHT, SCREENS } from 'navigation/constants'
import PlatformColor from 'ui/PlatformColor'

const { width } = Dimensions.get('window')

const NUM_COLUMNS = 4
const ITEM_SIZE = width / NUM_COLUMNS - 4

const styles = {
  base: {
    flex: 1,
    marginTop: -STATUS_BAR_HEIGHT,
  },
  back: {
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 10,
    backgroundColor: PlatformColor.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 5,
  },
}

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
    <Touchable onPress={() => handleNavigate(item.node.postId)} style={styles.item}>
      <Image source={item.node} width={ITEM_SIZE} height={ITEM_SIZE} />
    </Touchable>
  )

  return (
    <>
      <View onPress={handleNavigationBack} style={styles.back}>
        <Icon source={arrowLeft} onPress={handleNavigationBack} />
      </View>

      <View style={styles.base}>
        <InfiniteList
          numColumns={NUM_COLUMNS}
          loaderInset={0}
          paddingHorizontal={0}
          paddingVertical={0}
          defaultSeparator={false}
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
