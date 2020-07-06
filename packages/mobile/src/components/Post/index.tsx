import React, { useCallback, useRef } from 'react'
import { Alert, View, Animated } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  useDeletePostMutation,
  FeedDocument,
  PostsDocument,
  CurrentUserProfileDocument,
  ProjectDocument,
  useLikePostMutation,
} from '@wrench/common'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation, SCREENS } from 'navigation'
import openLink from 'utils/openLink'
import { useDynamicColor } from 'utils/hooks'
import { Avatar, Carousel, Comments, Title, Text, Icon, TimeAgo } from 'ui'
import LikePost from 'components/LikePost'
import Bookmark from 'components/Bookmark'
import { share, sparkMega } from 'images'
import { Base, Top, Headline, Content, Spacer, Row } from './styles'

function Post({ post, withoutTitle, withoutComments, paddingBottom }) {
  const { t } = useTranslation()
  const { navigate, showEditPost } = useNavigation()
  const dynamicColor = useDynamicColor('inverse')
  const [deletePost] = useDeletePostMutation()
  const [toggleLike] = useLikePostMutation()
  const handleEdit = useCallback(() => showEditPost({ post }), [post])

  const animatedValue = useRef(new Animated.Value(0))

  const handleToggleLike = useCallback(
    (evt) => {
      if (evt.nativeEvent.state === State.ACTIVE) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        if (!post.likes.isLiked) {
          Animated.sequence([
            Animated.spring(animatedValue.current, {
              toValue: 1,
              useNativeDriver: true,
              tension: 250,
            }),
            Animated.spring(animatedValue.current, { toValue: 0, useNativeDriver: true }),
          ]).start()

          toggleLike({
            variables: {
              id: post.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              likePost: {
                __typename: 'Post',
                ...post,
                likes: {
                  __typename: 'Likes',
                  isLiked: true,
                  totalCount: post.likes.totalCount + 1,
                },
              },
            },
          })
        }
      }
    },
    [toggleLike, post]
  )

  const handleDeletePost = useCallback(
    (id) => {
      deletePost({
        variables: {
          id,
        },
        update: (cache) => {
          // Feed
          try {
            const data = cache.readQuery({ query: FeedDocument })
            const edges = data.feed.posts.edges.filter((edge) => edge.node.id !== id)

            cache.writeQuery({
              query: FeedDocument,
              data: {
                ...data,
                feed: {
                  ...data.feed,
                  posts: {
                    ...data.feed.posts,
                    edges,
                  },
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Recent posts
          try {
            const data = cache.readQuery({ query: PostsDocument })
            const edges = data.posts.edges.filter((edge) => edge.node.id !== id)

            cache.writeQuery({
              query: PostsDocument,
              data: {
                ...data,
                posts: {
                  ...data.posts,
                  edges,
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Current user
          try {
            const data = cache.readQuery({ query: CurrentUserProfileDocument })
            const edges = data.user.posts.edges.filter((edge) => edge.node.id !== id)

            cache.writeQuery({
              query: CurrentUserProfileDocument,
              data: {
                ...data,
                user: {
                  ...data.user,
                  posts: {
                    ...data.user.posts,
                    edges,
                  },
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Project
          try {
            const data = cache.readQuery({
              query: ProjectDocument,
              variables: {
                id: post.project.id,
              },
            })

            const edges = data.project.posts.edges.filter((edge) => edge.node.id !== id)

            cache.writeQuery({
              query: ProjectDocument,
              data: {
                ...data,
                project: {
                  ...data.project,
                  posts: {
                    ...data.project.posts,
                    edges,
                  },
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }
        },
      })
    },
    [deletePost]
  )

  const { showActionSheetWithOptions } = useActionSheet()

  const navigateToProject = useCallback(() => {
    if (!withoutTitle) {
      navigate(SCREENS.PROJECT, {
        id: post.project.id,
        post,
        postId: post.id,
        project: post.project,
      })
    }
  }, [post, withoutTitle])

  const navigateToUser = useCallback(() => {
    navigate(SCREENS.USER, {
      user: post.user,
    })
  }, [post])

  const onDelete = useCallback(() => {
    Alert.alert(
      t('Post:options:alertTitle'),
      null,
      [
        {
          onPress: () => handleDeletePost(post.id),
          style: 'destructive',
          text: t('Post:options:delete'),
        },
        {
          style: 'cancel',
          text: t('Post:options:cancel'),
        },
      ],
      { cancelable: false }
    )
  }, [post])

  const handleActionSheet = useCallback(() => {
    if (post.permissions.isOwner) {
      const options = [t('Post:options:edit'), t('Post:options:delete'), t('Post:options:cancel')]

      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
          tintColor: dynamicColor,
        },
        (index) => {
          if (index === 0) {
            handleEdit()
          }
          if (index === 1) {
            onDelete()
          }
        }
      )
    } else {
      const options = [t('Post:options:report'), t('Post:options:cancel')]
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
          tintColor: dynamicColor,
        },
        (index) => {
          if (index === 0) {
            openLink(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`)
          }
        }
      )
    }
  }, [handleEdit, onDelete, showActionSheetWithOptions])

  return (
    <Base paddingBottom={paddingBottom}>
      <Top>
        <Avatar
          uri={post.user.avatarUrl}
          onPress={navigateToUser}
          isOnline={post.user.isOnline}
          fallback={post.user.isSilhouette}
          fullName={post.user.fullName}
        />
        <Icon source={share} onPress={handleActionSheet} hitSlop={20} />
      </Top>
      <Content>
        {!withoutTitle && post.project.title && (
          <Headline>
            <Title fontSize={19} numberOfLines={1} onPress={navigateToProject}>
              {post.project.title}
            </Title>
          </Headline>
        )}

        <Text
          onPress={navigateToProject}
          disabled={withoutTitle}
          color={withoutTitle ? 'dark' : 'grey'}
          fontSize={15}
          lineHeight={24}
          maxText={120}
          parseEnabled
        >
          {post.caption}
        </Text>

        <Spacer />

        {post.files && (
          <TapGestureHandler numberOfTaps={2} onHandlerStateChange={handleToggleLike}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Carousel files={post.files} />

                <Animated.Image
                  pointerEvents="none"
                  source={sparkMega}
                  style={{
                    position: 'absolute',
                    opacity: animatedValue.current,
                    transform: [
                      {
                        scale: animatedValue.current.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.7, 1.5],
                        }),
                      },
                    ],
                  }}
                />
              </View>
            </View>
          </TapGestureHandler>
        )}
      </Content>

      <Row>
        <LikePost post={post} />

        <Bookmark post={post} />
      </Row>

      {!withoutComments && <Comments data={post} />}
      <TimeAgo date={post.createdAt} long />
    </Base>
  )
}

export default Post
