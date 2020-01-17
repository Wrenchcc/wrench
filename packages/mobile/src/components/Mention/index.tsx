import React from 'react'
import { View } from 'react-native'
import { useMentionStore } from 'store'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import { NAVIGATION } from 'navigation/constants'
import { keyboardHeight } from 'utils/platform'

const INPUT_HEIGHT = 60

function Mention({ onPress }) {
  const isFetching = false
  const data = null
  const fetchMore = () => {}
  const hasNextPage = false
  const isRefetching = false

  const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

  const { query } = useMentionStore(store => ({
    query: store.query,
  }))

  return (
    <View
      style={{
        backgroundColor: 'white',
        bottom: keyboardHeight + INPUT_HEIGHT,
        left: 0,
        position: 'absolute',
        top: NAVIGATION.STATUS_BAR_HEIGHT,
        width: '100%',
        zIndex: 100,
      }}
    >
      <InfiniteList
        defaultPadding
        androidDismissKeyboard={false}
        keyboardDismissMode="none"
        ListEmptyComponent={<NoResults />}
        data={data}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        borderSeparators
        ListFooterComponent={
          (query.length === 1 && !data) || (isFetching && query.length !== 0) ? (
            <SearchingFor query={query} />
          ) : (
            hasNextPage && <Loader />
          )
        }
      />
    </View>
  )
}

export default Mention
