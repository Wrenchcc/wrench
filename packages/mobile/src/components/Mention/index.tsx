import React, { useEffect } from 'react'
import { View } from 'react-native'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { useMentionStore } from 'store'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import { NAVIGATION } from 'navigation/constants'
import { keyboardHeight } from 'utils/platform'

const INPUT_HEIGHT = 60

function Mention({ onPress }) {
  const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

  const { query } = useMentionStore(store => ({
    query: store.query,
  }))

  const {
    loadData,
    data,
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
  } = usePaginatedLazyQuery('users')(SearchUsersDocument)

  useEffect(() => {
    loadData({
      variables: {
        query,
      },
    })
  }, [query])

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
        ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
        data={data}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        renderItem={renderItem}
        borderSeparators
        ListFooterComponent={
          isFetching && !data ? <SearchingFor query={query} /> : hasNextPage && <Loader />
        }
      />
    </View>
  )
}

export default Mention
