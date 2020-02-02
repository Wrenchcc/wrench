import React, { useEffect } from 'react'
import { View } from 'react-native'
import { usePaginatedLazyQuery, SearchModelsDocument } from '@wrench/common'
import { InfiniteList, Text, Touchable, SearchingFor } from 'ui'
import { keyboardHeight } from 'utils/platform'

const INPUT_HEIGHT = 80

const styles = {
  container: {
    backgroundColor: 'white',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
}

function SearchModel({ query, onPress }) {
  // TODO: Fetch more
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

  return (
    <View style={[styles.container, { bottom: keyboardHeight + INPUT_HEIGHT }]}>
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
            <Text fontSize={15} color="light_grey">
              {item.node.year}
            </Text>
          </Touchable>
        )}
        borderSeparator
      />
    </View>
  )
}

export default SearchModel
