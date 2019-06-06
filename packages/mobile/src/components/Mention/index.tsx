import React, { useEffect } from 'react'
import { View, Keyboard } from 'react-native'
import { InfiniteList, MentionUser, NoResults } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { dismissMention } from 'navigation'
import { isIphone, hasNotch } from 'utils/platform'

const OFFSET_BOTTOM = isIphone ? 351 : 70 // TODO: Get keyboard height

function Mention({ users, fetchMore, isRefetching, isFetching, hasNextPage, onPress }) {
  useEffect(() => {
    const keyboardHideEventListener = Keyboard.addListener('keyboardWillHide', () => {
      dismissMention()
    })

    return () => keyboardHideEventListener.remove()
  }, [])

  return (
    <View
      style={{
        backgroundColor: 'white',
        bottom: OFFSET_BOTTOM,
        left: 0,
        position: 'absolute',
        top: hasNotch ? 40 : 20, // TODO: Get header height
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
        renderItem={({ item }) => <MentionUser user={item.node} onPress={onPress} />}
        borderSeparator
      />
    </View>
  )
}

export default searchUsers(Mention)
