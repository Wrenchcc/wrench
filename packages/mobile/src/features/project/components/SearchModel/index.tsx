import React, { useEffect } from 'react'
import { View } from 'react-native'
import { usePaginatedLazyQuery, SearchModelsDocument } from '@wrench/common'
import { InfiniteList, Text, Touchable, SearchingFor, NoResults, Loader } from 'ui'
import { keyboardHeight } from 'utils/platform'
import HashtagSkeletonList from 'ui/Hashtag/SkeletonList'
import { NAVIGATION } from 'navigation/constants'
import PlatformColor from 'ui/PlatformColor'

const INPUT_HEIGHT = 80

const styles = {
  base: {
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: PlatformColor.default,
    top: NAVIGATION.STATUS_BAR_HEIGHT,
  },
}

function SearchModel({ query, onPress }) {
  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedLazyQuery(['models'])(SearchModelsDocument)

  useEffect(() => {
    if (query) {
      loadData({
        variables: {
          query,
        },
      })
    }
  }, [query])

  if (!query) {
    return null
  }

  const renderItem = ({ item }) => (
    <Touchable
      onPress={() => onPress(item.node)}
      key={item.node.id}
      style={{
        justifyContent: 'center',
      }}
    >
      <Text medium style={{ marginBottom: 3 }}>{`${item.node.brand.name} ${item.node.model}`}</Text>
      <Text fontSize={15} color="accent">
        {item.node.year}
      </Text>
    </Touchable>
  )

  const ListEmptyComponent = isFetching ? (
    <HashtagSkeletonList />
  ) : (
    !isFetching && query.length > 1 && <NoResults />
  )

  const ListFooterComponent =
    isFetching && !edges ? (
      <SearchingFor query={query} />
    ) : (
      hasNextPage && query && isFetching && <Loader />
    )

  return (
    <View
      styles={[
        styles.base,
        {
          bottom: keyboardHeight + INPUT_HEIGHT,
        },
      ]}
    >
      <InfiniteList
        borderSeparator
        initialNumToRender={8}
        keyboard
        keyboardDismissMode="none"
        ListEmptyComponent={ListEmptyComponent}
        data={edges}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default SearchModel
