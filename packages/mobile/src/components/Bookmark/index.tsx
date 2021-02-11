import React, { useCallback } from 'react'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useBookmarkPostMutation } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { Icon } from 'ui'
import { scaleAnimation } from 'utils/animations'
import { bookmark, bookmarkFilled } from 'images'
import { Base } from './styled'

function Bookmark({ post }) {
  const [toggleBookmark] = useBookmarkPostMutation()
  const animatedValue = useSharedValue(1)

  const handleToggleBookmark = useCallback(() => {
    animatedValue.value = scaleAnimation()

    if (!post.bookmarks.isBookmarked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    toggleBookmark({
      variables: {
        id: post.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        bookmarkPost: {
          __typename: 'Post',
          ...post,
          bookmarks: {
            __typename: 'Bookmarks',
            isBookmarked: !post.bookmarks.isBookmarked,
            totalCount: post.bookmarks.isBookmarked
              ? post.bookmarks.totalCount - 1
              : post.bookmarks.totalCount + 1,
          },
        },
      },
    })
  }, [toggleBookmark, post])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedValue.value }],
    }
  })

  return (
    <Base>
      <Animated.View style={animatedStyle}>
        <Icon
          source={post.bookmarks.isBookmarked ? bookmarkFilled : bookmark}
          onPress={handleToggleBookmark}
          hitSlop={20}
        />
      </Animated.View>
    </Base>
  )
}

export default Bookmark
