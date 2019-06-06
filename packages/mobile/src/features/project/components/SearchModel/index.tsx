import React from 'react'
import { View } from 'react-native'
import { InfiniteList, Text, Touchable, SearchingFor } from 'ui'
import { searchModels } from 'graphql/queries/project/searchModels'
import { isIphone, hasNotch } from 'utils/platform'

const DEFAULT_OFFSET_BOTTOM = isIphone ? (hasNotch ? 365 : 290) : 80

const styles = {
  container: {
    backgroundColor: 'white',
    bottom: DEFAULT_OFFSET_BOTTOM,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
}

const keyExtractor = item => item.node.id

function SearchModel({ query, models, fetchMore, isFetching, hasNextPage, onPress }) {
  if (!query) {
    return null
  }

  return (
    <View style={styles.container}>
      <InfiniteList
        defaultPadding
        ListHeaderComponent={
          (query.length === 1 && !models) || isFetching ? <SearchingFor query={query} /> : null
        }
        keyboardDismissMode="none"
        data={models}
        fetchMore={fetchMore}
        isFetching={false}
        hasNextPage={isFetching ? false : hasNextPage}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <Touchable
            onPress={() => onPress(item.node)}
            key={item.node.id}
            style={{
              height: 70,
              justifyContent: 'center',
            }}
          >
            <Text medium style={{ marginBottom: 3 }}>{`${item.node.brand.name} ${
              item.node.model
            }`}</Text>
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

export default searchModels(SearchModel)
