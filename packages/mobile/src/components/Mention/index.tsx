import React from 'react'
import { View } from 'react-native'
import { useMentionStore } from 'store'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { NAVIGATION } from 'navigation/constants'
import { isIphone, hasNotch } from 'utils/platform'

const SAFE_AREA = hasNotch ? 75 : 0
const OFFSET_BOTTOM = isIphone ? 275 + SAFE_AREA : 60

// TODO: Use useQuery instead of HoC
const List = searchUsers(
  ({ users, fetchMore, isRefetching, isFetching, hasNextPage, onPress, query }) => {
    const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

    return (
      <View
        style={{
          backgroundColor: 'white',
          bottom: OFFSET_BOTTOM,
          left: 0,
          position: 'absolute',
          top: NAVIGATION.STATUS_BAR_HEIGHT,
          width: '100%',
        }}
      >
        <InfiniteList
          defaultPadding
          androidDismiss={false}
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

  return <List query={query} onPress={onPress} />
}

export default Mention
