import React, { useCallback, useRef, useEffect } from 'react'
import { View, Image, Animated, Dimensions } from 'react-native'
import { useDeleteCommentMutation, CommentsDocument } from '@wrench/common'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useNavigation, SCREENS } from 'navigation'
import { useDynamicColor } from 'utils/hooks'
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
  isReply = false,
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
  const dynamicColor = useDynamicColor('placeholder')
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
          id: id,
        },
        optimisticResponse: {
          id,
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Comment',
              id: commentId,
            }),
            fields: {
              repliesConnection(existingRepliesRefs = {}, { readField }) {
                return {
                  ...existingRepliesRefs,
                  edges: existingRepliesRefs.edges.filter(
                    ({ node }) => id !== readField('id', node)
                  ),
                  totalCount: existingRepliesRefs.totalCount - 1 || 0,
                }
              },
            },
          })

          // Post
          cache.modify({
            id: cache.identify({
              __typename: 'Post',
              id: postId,
            }),
            optimistic: true,
            fields: {
              commentsConnection(existingCommentsRefs = {}, { readField }) {
                const data = cache.readQuery({
                  query: CommentsDocument,
                  variables: {
                    postId,
                  },
                })

                const deleted = data.comments.edges.find(({ node }) => node.id === id)
                const replies = deleted.node.replies
                const ids = replies.edges.map(({ node }) => node.id)
                const remove = [id, ...ids]

                if (replies.length > 0) {
                  return {
                    ...existingCommentsRefs,
                    edges: data.comments.edges.filter(({ node }) =>
                      remove.includes(readField('id', node))
                    ),
                    totalCount: existingCommentsRefs.totalCount - remove.length || 0,
                  }
                }

                return {
                  ...existingCommentsRefs,
                  edges: data.comments.edges.filter(({ node }) => id !== readField('id', node)),
                  totalCount: existingCommentsRefs.totalCount - remove.length || 0,
                }
              },
            },
          })

          cache.modify({
            optimistic: true,
            fields: {
              comments(existingCommentsRefs = {}, { readField }) {
                return {
                  ...existingCommentsRefs,
                  edges: existingCommentsRefs.edges.filter(
                    ({ node }) => id !== readField('id', node)
                  ),
                  totalCount: existingCommentsRefs.totalCount - 1 || 0,
                }
              },
            },
          })
        },
      }),
    [deleteComment, id]
  )

  useEffect(() => {
    if (highlightId === id) {
      Animated.timing(animatedValue.current, {
        duration: 700,
        toValue: 1,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          Animated.timing(animatedValue.current, {
            duration: 700,
            toValue: 0,
            useNativeDriver: false,
          }).start()
        }
      })
    }
  }, [highlightId, id])

  const backgroundColor = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', dynamicColor],
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
                {text && (
                  <Text fontSize={15} parseEnabled>
                    {text}
                  </Text>
                )}
              </Text>
            </Row>

            <Row>
              <Action>
                <TimeAgo date={createdAt} />
              </Action>
              {!first && likes.totalCount > 0 && (
                <Action>
                  <Text medium color="accent" fontSize={12}>
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
                    color="accent"
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

export default Item
