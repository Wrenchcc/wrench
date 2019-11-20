// @ts-nocheck
import React, { memo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { prepend } from 'ramda'
import optimisticId from 'utils/optimisticId'
import { CURRENT_USER } from 'graphql/queries/user/currentUser'
import { ADD_COMMENT_MUTATION } from 'graphql/mutations/comment/addComment'
import postInfo from 'graphql/fragments/post/postInfo'
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
