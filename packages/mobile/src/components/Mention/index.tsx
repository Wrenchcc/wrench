import React from 'react'
import { View } from 'react-native'
import { InfiniteList, MentionUser, NoResults } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { dismissMention } from 'navigation'
import { isIphone, hasNotch } from 'utils/platform'

const OFFSET_BOTTOM = isIphone ? 351 : 70 // TODO: Get keyboard height

function Mention({ users, fetchMore, isRefetching, isFetching, hasNextPage }) {
  return (
    <View
      style={{
        width: '100%',
        left: 0,
        top: hasNotch ? 40 : 20, // TODO: Get header height
        bottom: OFFSET_BOTTOM,
        backgroundColor: 'white',
        position: 'absolute',
      }}
    >
      <InfiniteList
        defaultPadding
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        ListEmptyComponent={<NoResults />}
        data={users}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <MentionUser user={item.node} onPress={dismissMention} />}
        borderSeparator
      />
    </View>
  )
}

export default searchUsers(Mention)
