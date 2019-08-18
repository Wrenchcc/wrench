import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { compose } from 'ramda'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'ramda'
import { Page, FlatList } from 'navigation'
import { getProject } from 'graphql/queries/project/getProject'
import { followProject } from 'graphql/mutations/project/followProject'
import Post from 'components/Post'
import { Edit, EmptyState, Title, Share, Text } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'features/project/components/ProjectHeader'

const { interpolate, Extrapolate, Value } = Animated

function Project({
  posts,
  project,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  post,
  followProject: followProjectMutation,
}) {
  const scrollY = useRef(new Value(0))
  const { t } = useTranslation()

  const opacityFollow = interpolate(scrollY.current, {
    extrapolate: Extrapolate.CLAMP,
    inputRange: [300, 350],
    outputRange: [0, 1],
  })

  const opacityShare = interpolate(scrollY.current, {
    extrapolate: Extrapolate.CLAMP,
    inputRange: [220, 280],
    outputRange: [1, 0],
  })

  const handleFollow = useCallback(() => followProjectMutation(project.id), [project])

  const hasPosts = !isEmpty(post) || (posts && posts.length > 0)

  const emptyState =
    project.permissions && project.permissions.isOwner ? TYPES.PROJECT_POST : TYPES.PROJECT_NO_POSTS

  const renderItem = ({ item }) => {
    // Remove post item from list to skip dublicated
    if (post && post.id === item.node.id) {
      return null
    }

    return <Post post={item.node} avatar={false} withoutTitle />
  }

  const renderHeader = useCallback(() => {
    let content

    if (!isEmpty(post)) {
      content = (
        <>
          <Post post={post} withoutTitle />
          {hasPosts && posts && posts.length > 1 && (
            <View style={{ paddingTop: 40 }}>
              <Title medium>{t('Project:recent')}</Title>
            </View>
          )}
        </>
      )
    }

    return (
      <>
        {project.title && <ProjectHeader project={project} spacingHorizontal={!hasPosts} />}
        {content}
      </>
    )
  }, [post, posts, hasPosts, project])

  const fullScreen = !hasPosts || (isFetching && !posts)

  return (
    <Page
      headerTitle={project.title}
      scrollPosition={scrollY.current}
      headerRight={
        project.permissions && project.permissions.isOwner ? (
          <Edit project={project} />
        ) : (
          <>
            <Share title={project.title} url={project.dynamicLink} text opacity={opacityShare} />
            <Animated.View style={{ opacity: opacityFollow, position: 'absolute' }}>
              <Text medium onPress={handleFollow}>
                {project.permissions && project.permissions.isFollower
                  ? t('Project:unfollow')
                  : t('Project:follow')}
              </Text>
            </Animated.View>
          </>
        )
      }
    >
      <FlatList
        initialNumToRender={1}
        spacingSeparator
        paddingHorizontal={hasPosts ? 20 : 0}
        contentContainerStyle={{ flex: fullScreen ? 1 : 0 }}
        ListEmptyComponent={!hasPosts && <EmptyState type={emptyState} />}
        ListHeaderComponent={renderHeader}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default compose(
  getProject,
  followProject
)(Project)
