import React, { useCallback, useRef, memo } from 'react'
import { Animated } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useMutation, LIKE_POST_MUTATION } from 'gql'
import { Icon, Text } from 'ui'
import { spark } from 'images'
import { Base } from './styled'

function LikePost({ post }) {
  const { t } = useTranslation()
  const [toggleLike] = useMutation(LIKE_POST_MUTATION)

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
          color={post.likes.isLiked ? 'spark' : 'dark'}
          style={{ marginRight: 10 }}
          onPress={handleToggleLike}
          hapticFeedback="impactLight"
        />
      </Animated.View>

      <Text fontSize={15}>{t('LikePost:like', { count: post.likes.totalCount })}</Text>
    </Base>
  )
}

export default memo(LikePost)
