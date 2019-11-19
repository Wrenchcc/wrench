import React, { useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/react-hooks'
import { LIKE_POST_MUTATION } from 'graphql/mutations/post/like'
// import { useMutation, LIKE_POST_MUTATION } from 'gql'
import { Text } from 'ui'
import { Base } from './styled'

function LikePost({ post }) {
  const { t } = useTranslation()
  const [toggleLike] = useMutation(LIKE_POST_MUTATION)

  const handleToggleLike = useCallback(() => {
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
      <img
        style={{ marginRight: 10 }}
        onClick={handleToggleLike}
        src={post.likes.isLiked ? require('./spark-active.svg') : require('./spark.svg')}
        alt="Like post"
      />

      <Text fontSize={15}>{t('LikePost:like', { count: post.likes.totalCount })}</Text>
    </Base>
  )
}

export default memo(LikePost)
