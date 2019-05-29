import React from 'react'
import { View } from 'react-native'
import { InfiniteList, MentionUser, NoResults } from 'ui'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { dismissMention } from 'navigation'

const styles = {
  container: {
    width: '100%',
    left: 0,
    bottom: 400,
    top: 0,
    backgroundColor: 'white',
    position: 'absolute',
  },
}

// import { isIphone } from 'utils/platform'

// const keyboardHideEvent = isIphone ? 'keyboardWillHide' : 'keyboardDidHide'
//
// // Hide mention when scrolling parent list ie keyboard hides
// this.keyboardHideEventListener = Keyboard.addListener(
//   keyboardHideEvent,
//   this.props.closeMention
// )

function Mention({ users, fetchMore, isRefetching, isFetching, hasNextPage }) {
  return (
    <View style={styles.container}>
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
