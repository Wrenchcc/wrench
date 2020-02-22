import React, { memo, useCallback, useRef, useEffect } from 'react'
import { View, Image, Animated, Dimensions } from 'react-native'
import { useDeleteCommentMutation, PostFragmentDoc, CommentsDocument } from '@wrench/common'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation, SCREENS } from 'navigation'
import { logError } from 'utils/sentry'
import LikeComment from 'components/LikeComment'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { trash } from 'images'
import { Base, Content, Row, Reply, Action } from './styles'

export const { width } = Dimensions.get('window')

function renderRightAction(progress) {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  })

  return (
    <Animated.View style={{ width, transform: [{ translateX }] }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.RED }}>
        <View style={{ paddingLeft: 30 }}>
          <Image source={trash} />
        </View>
      </View>
    </Animated.View>
  )
}

function Item({
  createdAt,
  first = false,
  highlightId,
  id,
  commentId,
  isReply,
  onReply,
  t,
  text,
  user,
  permissions,
  likes,
  postId,
}) {
  const { navigate } = useNavigation()
  const animatedValue = useRef(new Animated.Value(0))
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        user,
      }),
    [user]
  )

  const commentOrReplyId = commentId || id

  const handleOnReply = useCallback(
    () =>
      onReply({
        commentId: commentOrReplyId,
        username: user.username,
      }),
    [user, commentOrReplyId, onReply]
  )

  const [deleteComment] = useDeleteCommentMutation()

  const handleDeleteComment = useCallback(
    () =>
      deleteComment({
        variables: {
          id: commentOrReplyId,
        },
        update: cache => {
          // Post
          try {
            const data = cache.readFragment({
              id: `Post:${postId}`,
              fragment: PostFragmentDoc,
              fragmentName: 'Post',
            })

            const edges = data.comments.edges.filter(edge => edge.node.id !== commentOrReplyId)

            cache.writeFragment({
              id: `Post:${postId}`,
              fragment: PostFragmentDoc,
              fragmentName: 'Post',
              data: {
                ...data,
                comments: {
                  ...data.comments,
                  edges,
                  totalCount: data.comments.totalCount - 1 || 0,
                },
              },
            })
          } catch (err) {
            logError(err)
          }

          // Comment list
          try {
            const data = cache.readQuery({
              query: CommentsDocument,
              variables: {
                postId,
              },
            })

            const edges = data.comments.edges.filter(edge => edge.node.id !== commentOrReplyId)

            const comments = {
              ...data,
              comments: {
                ...data.comments,
                edges,
              },
            }

            cache.writeQuery({
              query: CommentsDocument,
              variables: {
                postId,
              },
              data: comments,
            })
          } catch (err) {
            logError(err)
          }
        },
      }),
    [deleteComment, commentOrReplyId]
  )

  useEffect(() => {
    if (highlightId === id) {
      Animated.timing(animatedValue.current, {
        duration: 1000,
        toValue: 1,
      }).start(() => {
        Animated.timing(animatedValue.current, {
          delay: 3000,
          toValue: 0,
        }).start()
      })
    }
  }, [highlightId, id])

  const backgroundColor = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', COLORS.ULTRA_LIGHT_GREY],
  })

  if (!user) {
    return null
  }

  return (
    <Swipeable
      enabled={permissions.isOwner}
      friction={2}
      rightThreshold={100}
      renderRightActions={!first && permissions.isOwner && renderRightAction}
      onSwipeableRightOpen={handleDeleteComment}
    >
      <Animated.View style={{ backgroundColor }}>
        <Base isReply={isReply} first={first}>
          <Avatar
            uri={user.avatarUrl}
            size={isReply ? 20 : 30}
            isOnline={user.isOnline}
            badgeSize={isReply && 'small'}
            onPress={handleNavigation}
            fallback={user.isSilhouette}
            fullName={user.fullName}
          />
          <Content>
            <Row>
              <Text>
                <Text fontSize={15} bold onPress={handleNavigation}>{`${user.fullName} `}</Text>
                {text && <Text fontSize={15}>{text}</Text>}
              </Text>
            </Row>

            <Row>
              <Action>
                <TimeAgo date={createdAt} />
              </Action>
              {!first && likes.totalCount > 0 && (
                <Action>
                  <Text medium color="subtle" fontSize={12}>
                    {t('CommentItem:like', { count: likes.totalCount })}
                  </Text>
                </Action>
              )}
              {!first && (
                <Action>
                  <Reply
                    medium
                    fontSize={12}
                    onPress={handleOnReply}
                    disabled={id < 0}
                    color="subtle"
                  >
                    {t('CommentItem:reply')}
                  </Reply>
                </Action>
              )}
            </Row>
          </Content>

          {!first && <LikeComment comment={{ id, text, user, permissions, likes }} />}
        </Base>
      </Animated.View>
    </Swipeable>
  )
}

export default memo(Item)
