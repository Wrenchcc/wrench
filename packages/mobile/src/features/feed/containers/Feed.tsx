import React, { useEffect, useCallback, useRef } from 'react'
import { View, Dimensions } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
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
  SCREENS,
} from 'navigation'
import Post from 'components/Post'
import { ShowLatest } from 'ui'
import * as Spacing from 'ui/Spacing'
import ProjectSuggestions from 'features/feed/components/ProjectSuggestions'
import ProjectsRow from 'features/project/components/SimilarProjects'
import Skeleton from 'components/Post/Skeleton'

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

const THREE_MINUTES = 180000

function Feed() {
  const latestNode = useRef(null)
  const isVisible = useSharedValue(false)
  const { scrollTo } = useScrollContext()
  const isPosting = useReactiveVar(store.post.isPostingVar)
  const file = useReactiveVar(store.files.croppedFilesVar)[0]

  useScrollToTop(SCREENS.FEED)

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['feed', 'posts'])(FeedDocument, {
    pollInterval: THREE_MINUTES,
  })

  useEffect(() => {
    getTrackingConsent()
  }, [])

  useEffect(() => {
    const node = edges && edges[0]?.node

    if (
      node &&
      latestNode.current &&
      latestNode.current.id !== node.id &&
      !node.permissions.isOwner &&
      !latestNode.current.permissions.isOwner
    ) {
      isVisible.value = true
    }

    latestNode.current = node
  }, [edges])

  useEffect(() => {
    if (isPosting) {
      showPosting({ file })
      scrollTo(-1000)
    } else {
      NavigationBanner.dismiss()
    }
  }, [isPosting])

  const handleOnClose = useCallback(() => {
    isVisible.value = false
  }, [])

  const StickyComponent = <ShowLatest onClose={handleOnClose} isVisible={isVisible} />

  const ListEmptyComponent = isFetching ? (
    <>
      <Skeleton />
      <Spacing.Horizontally px={50} />
      <Skeleton />
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
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default withScrollableContext(Feed)
