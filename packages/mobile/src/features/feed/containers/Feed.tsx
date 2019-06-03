import React, { useEffect } from 'react'
import { Layout, FlatList } from 'navigation'
import { getFeed } from 'graphql/queries/getFeed'
import Post from 'components/Post'
import { PostProgress } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
import { registerUserLocale } from 'i18n'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'

function Feed({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  useEffect(() => {
    registerForPushNotifications()
    registerUserLocale()
  }, [])

  return (
    <Layout stickyComponent={<PostProgress />}>
      <FlatList
        tabIndex={0}
        initialNumToRender={2}
        spacingSeparator
        data={posts}
        ListEmptyComponent={<ProjectSuggestions />}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={({ item }) => <Post post={item.node} />}
      />
    </Layout>
  )
}

export default getFeed(Feed)
