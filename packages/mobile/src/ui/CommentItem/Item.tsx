import React, { useCallback, useRef, useState, useEffect } from 'react'
import { View, Image, Animated, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  useDeleteCommentMutation,
  CommentsDocument,
  useTranslateCommentMutation,
} from '@wrench/common'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useNavigation, SCREENS } from 'navigation'
import { useDynamicColor } from 'utils/hooks'
import LikeComment from 'components/LikeComment'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import ParsedText from 'ui/ParsedText'
import TimeAgo from 'ui/TimeAgo'
import { COLORS } from 'ui/constants'
import { trash } from 'images'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  row: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  reply: {
    marginLeft: 5,
  },
  action: {
    marginRight: 10,
    flexDirection: 'row',
  },
}

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
  text,
  user,
  permissions,
  translatable,
  likes,
  postId,
}) {
  const { t } = useTranslation('comment-item')
  const [original, setOriginal] = useState(true)
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

  const [translateComment, { loading: translationLoading }] = useTranslateCommentMutation()

  const handleTranslation = useCallback(() => {
    setOriginal(!original)

    translateComment({
      variables: {
        id,
        original: !original,
      },
    })
  }, [id, original])

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
        <View
          style={[
            styles.base,
            {
              paddingTop: first ? 0 : 10,
              paddingBottom: first ? 10 : 0,
              marginBottom: first ? 20 : 10,
              marginLeft: isReply ? 40 : 0,
              borderBottomWidth: first ? 1 : 0,
              borderBottomColor: PlatformColor.divider,
            },
          ]}
        >
          <Avatar
            uri={user.avatarUrl}
            size={isReply ? 20 : 30}
            isOnline={user.isOnline}
            badgeSize={isReply && 'small'}
            onPress={handleNavigation}
            fallback={user.isSilhouette}
            fullName={user.fullName}
          />
          <View style={styles.content}>
            <View style={styles.row}>
              <Text>
                <Text fontSize={15} bold onPress={handleNavigation}>{`${user.fullName} `}</Text>
                {text && <ParsedText fontSize={15}>{text}</ParsedText>}
              </Text>
            </View>

            <View style={styles.row}>
              <View style={styles.action}>
                <TimeAgo date={createdAt} />
              </View>

              {!first && likes.totalCount > 0 && (
                <View style={styles.action}>
                  <Text medium color="accent" fontSize={12}>
                    {t('like', { count: likes.totalCount })}
                  </Text>
                </View>
              )}

              {!first && (
                <View style={styles.action}>
                  <Text
                    style={[
                      styles.reply,
                      {
                        opacity: id < 0 ? 0.7 : 1,
                      },
                    ]}
                    medium
                    fontSize={12}
                    onPress={handleOnReply}
                    color="accent"
                  >
                    {t('reply')}
                  </Text>
                </View>
              )}

              <View style={styles.action}>
                {translatable && (
                  <>
                    <Text color="neutral" medium fontSize={12} style={{ marginRight: 9 }}>
                      •
                    </Text>
                    {translationLoading ? (
                      <Text color="inverse" medium fontSize={12}>
                        {t('post:loading')}
                      </Text>
                    ) : (
                      <Text
                        color="inverse"
                        medium
                        fontSize={12}
                        onPress={handleTranslation}
                        numberOfLines={1}
                      >
                        {original ? t('post:translation') : t('post:original')}
                      </Text>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>

          {!first && <LikeComment comment={{ id, text, user, permissions, likes }} />}
        </View>
      </Animated.View>
    </Swipeable>
  )
}

export default Item
