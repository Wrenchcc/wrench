import React, { useCallback } from 'react'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { scaleAnimation } from 'utils/animations'
import { useLikePostMutation } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Icon, Text, UserStack } from 'ui'
import { spark } from 'images'
import { Base } from './styled'

function LikePost({ post }) {
  const animatedValue = useSharedValue(1)
  const { t } = useTranslation('like-post')
  const { navigate } = useNavigation()
  const [toggleLike] = useLikePostMutation()

  const navigateToLikes = useCallback(() => {
    navigate(SCREENS.LIKES, { id: post.id })
  }, [])

  const handleToggleLike = useCallback(() => {
    animatedValue.value = scaleAnimation()

    if (!post.likes.isLiked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

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
            isLiked: !post.likes.isLiked,
            totalCount: post.likes.isLiked ? post.likes.totalCount - 1 : post.likes.totalCount + 1,
          },
        },
      },
    })
  }, [toggleLike, post])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animatedValue.value,
        },
      ],
    }
  })

  return (
    <Base>
      <Animated.View style={animatedStyle}>
        <Icon
          source={spark}
          color={post.likes.isLiked ? 'warning' : 'inverse'}
          style={{ marginRight: 10 }}
          onPress={handleToggleLike}
          hitSlop={20}
        />
      </Animated.View>

      {post.likes.totalCount > 2 && (
        <UserStack users={post.likesConnection.edges} onPress={navigateToLikes} />
      )}

      <Text fontSize={15} onPress={navigateToLikes}>
        {t('like', { count: post.likes.totalCount })}
      </Text>
    </Base>
  )
}

export default LikePost
