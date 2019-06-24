import React from 'react'
import { View } from 'react-native'
import { InfiniteList, MentionUser, NoResults } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { NAVIGATION } from 'navigation/constants'
import { isIphone, hasNotch } from 'utils/platform'

const SAFE_AREA = hasNotch ? 60 : 0
const OFFSET_BOTTOM = isIphone ? 300 + SAFE_AREA : 70

function Mention({ users, fetchMore, isRefetching, isFetching, hasNextPage, onPress }) {
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
        keyboardDismissMode="none"
        ListEmptyComponent={<NoResults />}
        data={users}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
        borderSeparator
      />
    </View>
  )
}

export default searchUsers(Mention)
