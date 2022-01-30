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

  const bottom = keyboardHeight + INPUT_HEIGHT

  const content =
    isFetching && !edges ? (
      <HashtagSkeletonList contentInset={0} marginTop={15} />
    ) : (
      <InfiniteList
        borderSeparator
        initialNumToRender={8}
        paddingBottom={0}
        keyboard
        androidDismissKeyboard={false}
        keyboardDismissMode="none"
        ListEmptyComponent={!isFetching && query.length > 1 && <NoResults />}
        data={edges}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        renderItem={({ item }) => (
          <Touchable
            onPress={() => onPress(item.node)}
            key={item.node.id}
            style={{
              height: 70,
              justifyContent: 'center',
            }}
          >
            <Text
              medium
              style={{ marginBottom: 3 }}
            >{`${item.node.brand.name} ${item.node.model}`}</Text>
            <Text fontSize={15} color="accent">
              {item.node.year}
            </Text>
          </Touchable>
        )}
        defaultPadding
        ListFooterComponent={
          isFetching && !edges ? (
            <SearchingFor query={query} />
          ) : (
            hasNextPage && query && isFetching && <Loader />
          )
        }
      />
    )

  return <Base bottom={bottom}>{content}</Base>
}

export default SearchModel
