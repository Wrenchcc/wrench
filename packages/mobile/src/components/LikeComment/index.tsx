import React, { useCallback } from 'react'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { scaleAnimation } from 'utils/animations'
import { useLikeCommentMutation } from '@wrench/common'
import { Icon } from 'ui'
import { sparkSmall } from 'images'

const styles = {
  base: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}

function LikeComment({ comment }) {
  const animatedValue = useSharedValue(1)

  const [toggleLike] = useLikeCommentMutation()

  const handleToggleLike = useCallback(() => {
    animatedValue.value = scaleAnimation()

    if (!comment.likes.isLiked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

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
  }, [toggleLike, comment])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedValue.value }],
    }
  })

  return (
    <Animated.View style={[styles.base, animatedStyle]}>
      <Icon
        source={sparkSmall}
        color={comment.likes.isLiked ? 'warning' : 'inverse'}
        onPress={handleToggleLike}
      />
    </Animated.View>
  )
}

export default LikeComment
