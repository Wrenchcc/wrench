import {
  optimisticId,
  useAddCommentMutation,
  useCurrentUserQuery,
  CurrentUserDocument,
  PostFragmentDoc,
  CommentFragmentDoc,
} from '@wrench/common'
import EmojiList from 'components/EmojiList'
import { useNavigation } from 'navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMentionStore } from 'store'
import { Avatar, Text } from 'ui'
import { MENTION } from './constants'
import { Inner, Input } from './styles'

const COMMENT_FIELD_HEIGHT = 40

function CommentField({ postId, commentId, username, emoji, blurOnSubmit }) {
  const { t } = useTranslation()
  const inputRef = useRef()
  const isTracking = useRef(false)
  const [text, setText] = useState('')
  const { showMention, dismissMention } = useNavigation()

  const [addComment] = useAddCommentMutation()

  const { updateQuery, query } = useMentionStore((store) => ({
    query: store.query,
    updateQuery: store.actions.updateQuery,
  }))

  const { data } = useCurrentUserQuery()

  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  const handleSubmit = () => {
    if (blurOnSubmit) {
      inputRef.current.blur()
    }

    setText('')

    addComment({
      variables: {
        postId,
        commentId,
        input: {
          text,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addComment: {
          __typename: 'Comment',
          id: optimisticId(),
          commentId,
          postId,
          text,
          likes: {
            isLiked: false,
            totalCount: 0,
            __typename: 'Likes',
          },
          permissions: {
            isOwner: true,
            __typename: 'CommentPermissions',
          },
        },
      },
      update: (cache, { data: { addComment } }) => {
        const { user } = cache.readQuery({ query: CurrentUserDocument })

        cache.modify({
          id: `Post:${postId}`,
          broadcast: false,
          optimistic: true,
          fields: {
            commentsConnection(existingCommentRefs = {}) {
              const newCommentRef = cache.writeFragment({
                broadcast: false,
                fragmentName: 'Comment',
                data: {
                  user,
                  ...addComment,
                },
                fragment: CommentFragmentDoc,
              })

              return {
                ...existingCommentRefs,
                edges: [
                  {
                    __typename: 'CommentEdge',
                    node: newCommentRef,
                  },
                  ...existingCommentRefs.edges,
                ],
                totalCount: existingCommentRefs.totalCount + 1,
              }
            },
          },
        })
      },
    })
  }

  const handleOnChangeText = useCallback(
    (val) => {
      setText(val)

      const lastChar = val.substr(val.length - 1)

      if (lastChar === MENTION.TRIGGER) {
        isTracking.current = true

        showMention({
          onPress: (user) => {
            const comment = val.slice(0, -query.length - 1)
            setText(`${comment}@${user.username} `)
            isTracking.current = false
            dismissMention()
          },
        })
      } else if ((lastChar === MENTION.EMPTY && isTracking.current) || val === '') {
        isTracking.current = false

        dismissMention()
      }

      if (isTracking.current) {
        const pattern = new RegExp(MENTION.PATTERN, 'gi')
        const keywordArray = val.match(pattern)
        if (keywordArray && !!keywordArray.length) {
          const lastKeyword = keywordArray[keywordArray.length - 1]

          updateQuery(lastKeyword.replace(MENTION.TRIGGER, ''))

          showMention({
            onPress: (user) => {
              const comment = val.slice(0, -query.length - 1)
              setText(`${comment}@${user.username} `)
              isTracking.current = false

              dismissMention()
            },
          })
        }
      }
    },
    [showMention, dismissMention, setText, updateQuery, query]
  )

  const handleEmojiShortcut = useCallback(
    (e) => {
      const value = text.length > 0 ? `${text} ${e}` : e
      setText(value)
    },
    [setText, text]
  )

  return (
    <>
      {emoji && <EmojiList onPress={handleEmojiShortcut} />}

      <Inner>
        <Avatar
          uri={data?.user.avatarUrl}
          fallback={data?.user.isSilhouette}
          fullName={data?.user.fullName}
        />
        <Input
          ref={inputRef}
          onSubmitEditing={(text.length > 0 && handleSubmit) || null}
          placeholder={t('CommentField:placeholder')}
          keyboardType="twitter"
          onChangeText={handleOnChangeText}
          value={text}
          color="dark"
          height={COMMENT_FIELD_HEIGHT}
        />
        {text.length > 0 && (
          <Text fontSize={15} medium onPress={handleSubmit}>
            {t('CommentField:post')}
          </Text>
        )}
      </Inner>
    </>
  )
}

export default CommentField
