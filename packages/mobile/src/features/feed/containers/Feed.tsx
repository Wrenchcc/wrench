import React, { useEffect, useState, useCallback, useRef } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { pathOr } from 'ramda'
import { Layout, FlatList } from 'navigation'
import { getFeed } from 'graphql/queries/getFeed'
import Post from 'components/Post'
import { Posting, ShowLatest } from 'ui'
import registerForPushNotifications from 'utils/pushNotifications/register'
import { registerUserLocale } from 'i18n'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'
import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

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
  }, [])

  useEffect(() => {
    if (
      posts &&
      posts.length > 10 &&
      !pathOr(false, [0, 'node', 'permissions', 'isOwner'], posts)
    ) {
      setHasNewPosts(true)
    }
    // If first id change
  }, [pathOr(false, [0, 'node', 'id'], posts)])

  const StickyComponent = hasNewPosts ? (
    <ShowLatest onHide={closeNewPosts} onPress={scrollToTop} />
  ) : (
    <Posting />
  )

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Layout headerTitleKey="home" stickyComponent={StickyComponent}>
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
    </KeyboardAvoidingView>
  )
}

export default getFeed(Feed)
