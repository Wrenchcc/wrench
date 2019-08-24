import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useMutation, LIKE_COMMENT_MUTATION } from 'gql'
import { Icon } from 'ui'
import { sparkSmall } from 'images'
import { Base } from './styles'

function LikeComment({ comment }) {
  const [toggleLike] = useMutation(LIKE_COMMENT_MUTATION)

  const animatedValue = useRef(new Animated.Value(0))

  const scale = animatedValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  })

  const handleToggleLike = useCallback(() => {
    animatedValue.current.setValue(0)

    Animated.spring(animatedValue.current, {
      toValue: 1,
      duration: 330,
      useNativeDriver: true,
    }).start()

    toggleLike({
      variables: {
        id: comment.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeComment: {
          __typename: 'Comment',
          ...comment,
          likes: {
            __typename: 'Likes',
            isLiked: !comment.likes.isLiked,
            totalCount: comment.likes.isLiked
              ? comment.likes.totalCount - 1
              : comment.likes.totalCount + 1,
          },
        },
      },
    })
  }, [toggleLike])

  return (
    <Base>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          source={sparkSmall}
          color={comment.likes.isLiked ? 'spark' : 'dark'}
          onPress={handleToggleLike}
          hapticFeedback="impactLight"
        />
      </Animated.View>
    </Base>
  )
}

export default LikeComment
