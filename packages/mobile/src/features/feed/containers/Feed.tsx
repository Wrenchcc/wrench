import React, { useEffect, useState, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import ms from 'ms'
import { showPosting, NavigationBanner } from 'navigation/banner'
import { getTrackingConsent } from 'utils/analytics'
import { usePaginatedQuery, FeedDocument, useSimilarProjectsQuery } from '@wrench/common'
import { useReactiveVar, store } from 'gql'
import {
  Layout,
  useScrollToTop,
  useScrollContext,
  withScrollableContext,
  FlatList,
} from 'navigation'
import Post from 'components/Post'
import { ShowLatest } from 'ui'
import * as Spacing from 'ui/Spacing'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'
import ProjectsRow from 'features/project/components/SimilarProjects'
import PostSkeleton from 'components/Post/Skeleton'

const { width } = Dimensions.get('window')

const SimilarProjects = ({ id }) => {
  const { loading, data } = useSimilarProjectsQuery({
    variables: {
      id,
    },
  })

  return (
    <View style={{ height: 290, width }}>
      {!loading && <ProjectsRow projects={data.similarProjects} marginTop={10} disableAnimation />}
    </View>
  )
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
  const { scrollTo } = useScrollContext()

  const [hasNewPosts, setHasNewPosts] = useState(false)
  const [latestId, setLatestId] = useState('')
  const closeNewPosts = useCallback(() => setHasNewPosts(false), [])

  const isPosting = useReactiveVar(store.post.isPostingVar)
  const file = useReactiveVar(store.files.croppedFilesVar)[0]

  useScrollToTop()

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
      showPosting({ file })
      scrollTo(-1000)
    } else {
      NavigationBanner.dismiss()
    }
  }, [isPosting])

  const StickyComponent = hasNewPosts && <ShowLatest onHide={closeNewPosts} />
  const ListEmptyComponent =
    isFetching && !isRefetching ? (
      <>
        <PostSkeleton />
        <Spacing.Horizontally px={50} />
        <PostSkeleton />
      </>
    ) : (
      <ProjectSuggestions />
    )

  return (
    <Layout headerTitleKey="home" stickyComponent={StickyComponent}>
      <FlatList
        initialNumToRender={2}
        spacingSeparator
        data={edges}
        ListEmptyComponent={ListEmptyComponent}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default withScrollableContext(Feed)
