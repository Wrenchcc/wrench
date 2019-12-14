import React from 'react'
import { View } from 'react-native'
import { InfiniteList, Text, Touchable, SearchingFor } from 'ui'
import { keyboardHeight } from 'utils/platform'
import { searchModels } from 'services/graphql/queries/project/searchModels'

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

function SearchModel({ query, models, fetchMore, isFetching, hasNextPage, onPress }) {
  if (!query) {
    return null
  }

  return (
    <View style={[styles.container, { bottom: keyboardHeight + INPUT_HEIGHT }]}>
      <InfiniteList
        androidDismissKeyboard={false}
        defaultPadding
        ListHeaderComponent={
          (query.length === 1 && !models) || isFetching ? <SearchingFor query={query} /> : null
        }
        keyboardDismissMode="none"
        data={models}
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

export default searchModels(SearchModel)
