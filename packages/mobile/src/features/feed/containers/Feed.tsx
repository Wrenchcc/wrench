import React, { useEffect, useState, useCallback, useRef } from 'react'
import { pathOr } from 'ramda'
import { Layout, FlatList, showModal, SCREENS } from 'navigation'
import { getFeed } from 'graphql/queries/getFeed'
import Post from 'components/Post'
import { PostProgress, ShowLatest } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/registerForPushNotifications'
import { registerUserLocale } from 'i18n'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'

const renderItem = ({ item }) => <Post post={item.node} />

function Feed({ posts, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const scrollRef = useRef()
  const [hasNewPosts, setHasNewPosts] = useState(false)
  const closeNewPosts = useCallback(() => setHasNewPosts(false), [])

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ offset: 0 })
    }
  }, [scrollRef])

  useEffect(() => {
    registerForPushNotifications()
    registerUserLocale()

    // showModal(SCREENS.WEBVIEW, {
    //   url: 'https://google.com',
    // })
  }, [])

  useEffect(() => {
    if (
      posts &&
      posts.length > 10 &&
      !pathOr(false, [0, 'node', 'postPermissions', 'isOwner'], posts)
    ) {
      setHasNewPosts(true)
    }
    // If first id change
  }, [pathOr(false, [0, 'node', 'id'], posts)])

  const StickyComponent = hasNewPosts ? (
    <ShowLatest onHide={closeNewPosts} onPress={scrollToTop} />
  ) : (
    <PostProgress />
  )

  return (
    <Layout stickyComponent={StickyComponent}>
      <FlatList
        ref={scrollRef}
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
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default getFeed(Feed)
