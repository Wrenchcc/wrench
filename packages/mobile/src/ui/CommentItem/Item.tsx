import React, { memo, useCallback, useRef, useEffect } from 'react'
import { View, Image, Animated, Dimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation, SCREENS } from 'navigation'
import { useMutation, DELETE_COMMENT_MUTATION } from 'gql'
import LikeComment from 'components/LikeComment'
import { CommentsQuery } from 'graphql/queries/comment/getComments'
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

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update: cache => {
      const data = cache.readQuery({ query: CommentsQuery, variables: { postId } })
      const edges = data.comments.edges.filter(edge => edge.node.id !== commentOrReplyId)

      cache.writeQuery({
        data: {
          ...data,
          comments: {
            ...data.comments,
            edges,
          },
        },
        query: CommentsQuery,
        variables: { postId },
      })
    },
  })

  const handleDeleteComment = useCallback(
    () =>
      deleteComment({
        variables: {
          id: commentOrReplyId,
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
    outputRange: [COLORS.WHITE, COLORS.ULTRA_LIGHT_GREY],
  })

  if (!user) {
    return null
  }

  return (
    <Swipeable
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
                  <Text medium color="light_grey" fontSize={12}>
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
                    color="light_grey"
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
