import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useBookmarkPostMutation } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { Icon } from 'ui'
import { bookmark, bookmarkFilled } from 'images'
import { Base } from './styled'

function Bookmark({ post }) {
  const [toggleBookmark] = useBookmarkPostMutation()

  const animatedValue = useRef(new Animated.Value(0))

  const scale = animatedValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1],
  })

  const handleToggleBookmark = useCallback(() => {
    animatedValue.current.setValue(0)
    Animated.spring(animatedValue.current, {
      toValue: 1,
      duration: 330,
      useNativeDriver: true,
    }).start()
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

  return (
    <Base>
      <Animated.View style={{ transform: [{ scale }] }}>
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
