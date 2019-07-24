import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, LIKE_POST_MUTATION } from 'gql'
import { Icon, Text } from 'ui'
import { spark, sparkActive } from 'images'
import { Base } from './styled'

function LikePost({ post }) {
  const { t } = useTranslation()
  const [toggleLike] = useMutation(LIKE_POST_MUTATION)

  const handleToggleLike = useCallback(
    () =>
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
              totalCount: post.likes.isLiked
                ? post.likes.totalCount - 1
                : post.likes.totalCount + 1,
            },
          },
        },
      }),
    [toggleLike]
  )
  return (
    <Base>
      <Icon
        source={post.likes.isLiked ? sparkActive : spark}
        style={{ marginRight: 10 }}
        onPress={handleToggleLike}
      />
      <Text fontSize={15}>{t('LikePost:like', { count: post.likes.totalCount })}</Text>
    </Base>
  )
}

export default LikePost
