// @ts-nocheck
import React, { memo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { prepend, append } from 'ramda'
import optimisticId from 'utils/optimisticId'
import { CURRENT_USER } from 'graphql/queries/user/currentUser'
import { GET_COMMENTS } from 'graphql/queries/comments'
import { ADD_COMMENT_MUTATION } from 'graphql/mutations/comment/addComment'
import postInfo from 'graphql/fragments/post/postInfo'
import commentInfo from 'graphql/fragments/comment/commentInfo'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { useCookie, Cookies } from 'hooks'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base, Inner, Input, Button } from './styles'
import { useRouter } from 'next/router'

const DEFAULT_AVATAR_URL = 'https://edge-files.wrench.cc/avatar/default.jpg'

const CommentField = React.forwardRef(({ postId, commentId, initialValue = '' }, ref) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isAuthenticated] = useCookie(Cookies.ACCESS_TOKEN)
  const [text, setText] = useState('')

  const currentUser = useQuery(CURRENT_USER, {
    skip: !isAuthenticated,
  })

  const [addCommentMutation] = useMutation(ADD_COMMENT_MUTATION)

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const handleOnChangeText = useCallback(
    ({ target }) => {
      setText(target.value)
    },
    [setText]
  )

  const handleSubmit = useCallback(() => {
    addCommentMutation({
      update(cache, { data: { addComment } }) {
        // Post
        try {
          const data = cache.readFragment({
            id: `Post:${postId}`,
            fragment: postInfo,
            fragmentName: 'postInfo',
          })

          const edges = prepend(
            {
              node: {
                id: optimisticId(),
                ...addComment,
                user: currentUser.data.user,
                __typename: 'Comment',
              },
              __typename: 'CommentEdge',
            },
            data.comments.edges
          ).slice(0, 2)

          cache.writeFragment({
            id: `Post:${postId}`,
            fragment: postInfo,
            fragmentName: 'postInfo',
            data: {
              ...data,
              comments: {
                ...data.comments,
                edges,
                totalCount: data.comments.totalCount + 1,
              },
            },
          })
        } catch (err) {
          console.log(err)
        }

        // Comment list
        try {
          // Is reply
          if (commentId) {
            // Get comment fragment
            const data = cache.readFragment({
              id: `Comment:${commentId}`,
              fragment: commentInfo,
              fragmentName: 'commentInfo',
            })

            const edges = append(
              {
                cursor: optimisticId(),
                node: {
                  id: optimisticId(),
                  createdAt: new Date().toISOString(),
                  likes: {
                    isLiked: false,
                    totalCount: 0,
                    __typename: 'Likes',
                  },
                  permissions: {
                    isOwner: true,
                    __typename: 'CommentPermissions',
                  },
                  ...addComment,
                  user: currentUser.data.user,
                  __typename: 'Comment',
                },
                __typename: 'CommentEdge',
              },
              data.replies.edges
            )

            // Add to top of replies
            cache.writeFragment({
              id: `Comment:${commentId}`,
              fragment: commentInfo,
              fragmentName: 'commentInfo',
              data: {
                ...data,
                replies: {
                  ...data.replies,
                  edges,
                  totalCount: data.replies.totalCount + 1,
                },
              },
            })
          } else {
            const data = cache.readQuery({
              query: GET_COMMENTS,
              variables: {
                postId,
              },
            })

            const comments = {
              ...data,
              comments: {
                ...data.comments,
                edges: prepend(
                  {
                    cursor: optimisticId(),
                    node: {
                      id: optimisticId(),
                      createdAt: new Date().toISOString(),
                      likes: {
                        isLiked: false,
                        totalCount: 0,
                        __typename: 'Likes',
                      },
                      permissions: {
                        isOwner: true,
                        __typename: 'CommentPermissions',
                      },
                      replies: {
                        totalCount: 0,
                        pageInfo: {
                          hasNextPage: false,
                          __typename: 'RepliesConnection',
                        },
                        edges: [],
                        __typename: 'CommentConnection',
                      },
                      ...addComment,
                      user: currentUser.data.user,
                      __typename: 'Comment',
                    },
                    __typename: 'CommentEdge',
                  },
                  data.comments.edges
                ),
              },
            }

            cache.writeQuery({
              query: GET_COMMENTS,
              variables: {
                postId,
              },
              data: comments,
            })
          }
        } catch (err) {
          // logError(err)
        }
      },
      variables: {
        commentId,
        postId,
        input: {
          text,
        },
      },
    })

    setText('')
  }, [postId, text, commentId])

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={router.asPath} />
    </Modal>
  ))

  const handleOnKeyDown = useCallback(
    evt => {
      if (evt.keyCode == 13 && evt.shiftKey == false) {
        evt.preventDefault()
        handleSubmit()
      }
    },
    [text]
  )

  const handleFocus = useCallback(() => {
    if (!isAuthenticated) {
      showModal()
    }
  }, [])

  return (
    <Base>
      <Inner>
        <Avatar uri={(currentUser.data && currentUser.data.user.avatarUrl) || DEFAULT_AVATAR_URL} />

        <Input
          ref={ref}
          placeholder={t('CommentField:placeholder')}
          placeholderTextColor={COLORS.LIGHT_GREY}
          onChange={handleOnChangeText}
          onFocus={handleFocus}
          value={text}
          onKeyDown={handleOnKeyDown}
        />
        {text.length > 0 && (
          <Button onClick={handleSubmit}>
            <Text fontSize={15} medium>
              {t('CommentField:post')}
            </Text>
          </Button>
        )}
      </Inner>
    </Base>
  )
})

export default memo(CommentField)
