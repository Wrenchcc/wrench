import React, { useEffect } from 'react'
import { View } from 'react-native'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import PlatformColor from 'ui/PlatformColor'
import { STATUS_BAR_HEIGHT } from 'navigation/constants'
import { keyboardHeight } from 'utils/platform'

const INPUT_HEIGHT = 60

const styles = {
  base: {
    backgroundColor: PlatformColor.default,
    bottom: keyboardHeight + INPUT_HEIGHT,
    left: 0,
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    width: '100%',
    zIndex: 100,
  },
}

function Mention({ onPress }) {
  const query = useReactiveVar(store.mention.mentionVar)

  const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
  } = usePaginatedLazyQuery(['users'])(SearchUsersDocument)

  useEffect(() => {
    loadData({
      variables: {
        query,
      },
    })
  }, [query])

  const ListFooterComponent =
    isFetching && !edges && query.length > 0 ? (
      <SearchingFor query={query} />
    ) : (
      hasNextPage && <Loader />
    )

  return (
    <View style={styles.base}>
      <InfiniteList
        keyboardDismissMode="none"
        ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
        data={edges}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        renderItem={renderItem}
        borderSeparators
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default Mention
