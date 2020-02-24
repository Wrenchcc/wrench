import React, { useEffect } from 'react'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { useMentionStore } from 'store'
import { InfiniteList, MentionUser, NoResults, SearchingFor, Loader } from 'ui'
import { Base } from './styles'

function Mention({ onPress }) {
  const renderItem = ({ item }) => <MentionUser user={item.node} onPress={onPress} />

  const { query } = useMentionStore(store => ({
    query: store.query,
  }))

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

  return (
    <Base>
      <InfiniteList
        defaultPadding
        androidDismissKeyboard={false}
        keyboardDismissMode="none"
        ListEmptyComponent={!isFetching && query.length > 0 && <NoResults />}
        data={edges}
        fetchMore={fetchMore}
        hasNextPage={isFetching ? false : hasNextPage}
        isFetching={isFetching && query.length === 0}
        isRefetching={isRefetching}
        renderItem={renderItem}
        borderSeparators
        ListFooterComponent={
          isFetching && !edges && query.length > 0 ? (
            <SearchingFor query={query} />
          ) : (
            hasNextPage && <Loader />
          )
        }
      />
    </Base>
  )
}

export default Mention
