import React, { useEffect } from 'react'
import { usePaginatedLazyQuery, SearchModelsDocument } from '@wrench/common'
import { InfiniteList, Text, Touchable, SearchingFor, NoResults, Loader } from 'ui'
import { keyboardHeight } from 'utils/platform'
import HashtagSkeletonList from 'ui/Hashtag/SkeletonList'
import { Base } from './styles'

const INPUT_HEIGHT = 80

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

  const bottom = keyboardHeight + INPUT_HEIGHT

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
    <Base bottom={bottom}>
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
    </Base>
  )
}

export default SearchModel
