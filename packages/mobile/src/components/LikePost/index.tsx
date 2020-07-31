import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useLikePostMutation } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Icon, Text, UserStack } from 'ui'
import { spark } from 'images'
import { Base } from './styled'

function LikePost({ post }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [toggleLike] = useLikePostMutation()

  const navigateToLikes = useCallback(() => {
    navigate(SCREENS.LIKES, { id: post.id })
  }, [])

  const animatedValue = useRef(new Animated.Value(0))

  const scale = animatedValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1],
  })

  const handleToggleLike = useCallback(() => {
    animatedValue.current.setValue(0)

    Animated.spring(animatedValue.current, {
      toValue: 1,
      duration: 330,
      useNativeDriver: true,
    }).start()

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

  return (
    <Base>
      <Animated.View style={{ transform: [{ scale }] }}>
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
        {t('LikePost:like', { count: post.likes.totalCount })}
      </Text>
    </Base>
  )
}

export default LikePost
