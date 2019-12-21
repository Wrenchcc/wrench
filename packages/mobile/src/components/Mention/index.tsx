import React from 'react'
import { View } from 'react-native'
import { useMentionStore } from 'store'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import { searchUsers } from 'services/graphql/queries/user/searchUsers'
import { NAVIGATION } from 'navigation/constants'
import { keyboardHeight } from 'utils/platform'
import { useDebounce } from 'utils/hooks'

const INPUT_HEIGHT = 60

// TODO: Use useQuery instead of HoC
const List = searchUsers(
  ({ users, fetchMore, isRefetching, isFetching, hasNextPage, onPress, query }) => {
    const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

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
          data={users}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          renderItem={renderItem}
          borderSeparators
          ListFooterComponent={
            (query.length === 1 && !users) || (isFetching && query.length !== 0) ? (
              <SearchingFor query={query} />
            ) : (
              hasNextPage && <Loader />
            )
          }
        />
      </View>
    )
  }
)

function Mention({ onPress }) {
  const { query } = useMentionStore(store => ({
    query: store.query,
  }))

  const debouncedQuery = useDebounce(query, 300)

  return <List query={debouncedQuery} onPress={onPress} />
}

export default Mention
