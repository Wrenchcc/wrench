import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useLikePostMutation } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { Icon } from 'ui'
import { bookmark, bookmarkFilled } from 'images'
import { Base } from './styled'

function Bookmark({ post }) {
  const [toggleLike] = useLikePostMutation()

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

    // toggleLike({
    //   variables: {
    //     id: post.id,
    //   },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     likePost: {
    //       __typename: 'Post',
    //       ...post,
    //       likes: {
    //         __typename: 'Likes',
    //         isLiked: !post.likes.isLiked,
    //         totalCount: post.likes.isLiked ? post.likes.totalCount - 1 : post.likes.totalCount + 1,
    //       },
    //     },
    //   },
    // })
  }, [toggleLike, post])

  return (
    <Base>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          source={false ? bookmarkFilled : bookmark}
          style={{ marginRight: 10 }}
          onPress={handleToggleLike}
          hitSlop={20}
        />
      </Animated.View>
    </Base>
  )
}

export default Bookmark
