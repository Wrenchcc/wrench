import React, { useCallback } from 'react'
import { useMutation, LIKE_COMMENT_MUTATION } from 'gql'
import { Icon } from 'ui'
import { sparkSmall, sparkSmallActive } from 'images'
import { Base } from './styles'

function LikeComment({ comment }) {
  const [toggleLike] = useMutation(LIKE_COMMENT_MUTATION)

  const handleToggleLike = useCallback(
    () =>
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
      }),
    [toggleLike]
  )

  return (
    <Base>
      <Icon
        source={comment.likes.isLiked ? sparkSmallActive : sparkSmall}
        onPress={handleToggleLike}
        hapticFeedback="impactLight"
      />
    </Base>
  )
}

export default LikeComment
