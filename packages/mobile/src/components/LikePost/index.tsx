import React, { useCallback } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { scaleAnimation } from 'utils/animations'
import { useLikePostMutation, CurrentUserDocument, UserFragmentDoc } from '@wrench/common'
import * as Haptics from 'expo-haptics'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Icon, Text, UserStack } from 'ui'
import { spark } from 'images'

const styles = {
  base: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
}

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
          ...post,
          likes: {
            ...post.likes,
            isLiked: !post.likes.isLiked,
            totalCount: post.likes.isLiked ? post.likes.totalCount - 1 : post.likes.totalCount + 1,
          },
        },
      },
      update: (cache, { data: { likePost } }) => {
        const { user } = cache.readQuery({ query: CurrentUserDocument })

        const newUserRef = cache.writeFragment({
          fragmentName: 'User',
          data: user,
          fragment: UserFragmentDoc,
        })

        cache.modify({
          id: cache.identify({
            __typename: 'Post',
            id: post.id,
          }),
          optimistic: true,
          fields: {
            likesConnection(existingUsersRefs = {}) {
              // NOTE: Add new user
              if (likePost.likes.isLiked) {
                const edges = [
                  {
                    __typename: 'LikeEdge',
                    node: newUserRef,
                  },
                  ...existingUsersRefs.edges,
                ].slice(0, 3)

                return {
                  ...existingUsersRefs,
                  edges,
                }
              }

              // NOTE: Remove user
              return {
                ...existingUsersRefs,
                edges: existingUsersRefs.edges.filter(
                  ({ node }) => node.__ref !== `User:${user.id}`
                ),
              }
            },
          },
        })
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
    <View style={styles.base}>
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
    </View>
  )
}

export default LikePost
