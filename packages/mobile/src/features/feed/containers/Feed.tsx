import React, { useEffect, useState, useCallback, useRef } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import ms from 'ms'
import { showPosting, NavigationBanner } from 'navigation/banner'
import { getTrackingConsent } from 'utils/analytics'
import { usePaginatedQuery, FeedDocument, useSimilarProjectsQuery } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import { Layout, FlatList, useScrollToTop, SCREENS } from 'navigation'
import Post from 'components/Post'
import { ShowLatest } from 'ui'
import * as Spacing from 'ui/Spacing'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'
import ProjectsRow from 'features/project/components/SimilarProjects'

import { isIphone } from 'utils/platform'

const KEYBOARD_BEHAVIOR = isIphone && 'padding'

const SimilarProjects = ({ id }) => {
  const { loading, data } = useSimilarProjectsQuery({
    variables: {
      id,
    },
  })

  if (loading) {
    return null
  }
  return <ProjectsRow projects={data.similarProjects} marginTop={10} disableAnimation />
}

const renderItem = ({ item, index }) => {
  if (index > 5 && index % 10 === 0) {
    return (
      <>
        <Post post={item.node} paddingBottom={0} />
        <SimilarProjects id={item.node?.project?.id} />
        <Spacing.Horizontally px={50} />
      </>
    )
  }

  return <Post post={item.node} />
}

function Feed() {
  const scrollRef = useRef(null)
  const [hasNewPosts, setHasNewPosts] = useState(false)
  const [latestId, setLatestId] = useState('')
  const closeNewPosts = useCallback(() => setHasNewPosts(false), [])

  const isPosting = useReactiveVar(store.post.isPostingVar)
  const image = useReactiveVar(store.files.croppedFilesVar)[0]

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['feed', 'posts'])(FeedDocument, {
    pollInterval: ms('3m'),
  })

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: -10000000 })
    }
  }, [scrollRef])

  useScrollToTop(scrollRef, SCREENS.FEED)

  useEffect(() => {
    getTrackingConsent()
  }, [])

  useEffect(() => {
    if (edges?.length) {
      const id = edges[0].node.id

      if (latestId && latestId !== id && !edges[0].node.permissions.isOwner) {
        setHasNewPosts(true)
      }

      setLatestId(id)
    }
  }, [edges])

  useEffect(() => {
    if (isPosting) {
      showPosting({ image })
      scrollToTop()
    } else {
      NavigationBanner.dismiss()
    }
  }, [isPosting])

  const StickyComponent = hasNewPosts && <ShowLatest onHide={closeNewPosts} onPress={scrollToTop} />

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} style={{ flex: 1 }} enabled={!hasNextPage}>
      <Layout headerTitleKey="home" stickyComponent={StickyComponent}>
        <FlatList
          ref={scrollRef}
          initialNumToRender={2}
          spacingSeparator
          data={edges}
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

export default Feed
