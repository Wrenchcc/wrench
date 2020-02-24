import React, { useEffect } from 'react'
import { usePaginatedLazyQuery, SearchModelsDocument } from '@wrench/common'
import { InfiniteList, Text, Touchable, SearchingFor } from 'ui'
import { keyboardHeight } from 'utils/platform'
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

  return (
    <Base bottom={bottom}>
      <InfiniteList
        androidDismissKeyboard={false}
        defaultPadding
        ListHeaderComponent={
          (query.length === 1 && !edges) || isFetching ? <SearchingFor query={query} /> : null
        }
        keyboardDismissMode="none"
        data={edges}
        fetchMore={fetchMore}
        isFetching={false}
        hasNextPage={isFetching ? false : hasNextPage}
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
            <Text fontSize={15} color="subtle">
              {item.node.year}
            </Text>
          </Touchable>
        )}
        borderSeparator
      />
    </Base>
  )
}

export default SearchModel
