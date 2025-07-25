import { View } from 'react-native'
import * as Haptics from 'expo-haptics'
import {
  optimisticId,
  useAddCommentMutation,
  useCurrentUserQuery,
  CurrentUserDocument,
  CommentFragmentDoc,
  CommentAndRepliesFragmentDoc,
} from '@wrench/common'
import { store } from 'gql'
import EmojiList from 'components/EmojiList'
import { useNavigation } from 'navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Text, Input } from 'ui'
import { MENTION } from './constants'

const styles = {
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderBottomWidth: 0,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 15,
  },
}

const COMMENT_FIELD_HEIGHT = 40

function CommentField({ postId, commentId, username, emoji, blurOnSubmit }) {
  const { t } = useTranslation('comment-field')
  const inputRef = useRef(null)
  const isTracking = useRef(false)
  const [text, setText] = useState('')
  const { showMention, dismissMention } = useNavigation()

  const [addComment] = useAddCommentMutation()

  const query = store.mention.mentionVar()

  useEffect(() => {
    if (username) {
      setText(`${MENTION.TRIGGER}${username} `)
      inputRef.current.focus()
    }
  }, [inputRef, username, commentId])

  const { data } = useCurrentUserQuery()

  const handleSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

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
        addComment: {
          __typename: 'Comment',
          createdAt: new Date().toISOString(),
          id: optimisticId(),
          translatable: false,
          likes: {
            __typename: 'Likes',
            isLiked: false,
            totalCount: 0,
          },
          permissions: {
            __typename: 'CommentPermissions',
            isOwner: true,
          },
          replies: {
            __typename: 'CommentConnection',
            edges: [],
            pageInfo: {
              __typename: 'PageInfo',
              hasNextPage: false,
            },
            totalCount: 0,
          },
          text,
          ...data,
        },
      },
      update: (cache, { data: { addComment } }) => {
        const { user } = cache.readQuery({ query: CurrentUserDocument })

        // Post
        if (postId) {
          const newCommentRef = cache.writeFragment({
            fragmentName: 'Comment',
            data: {
              ...addComment,
              user,
            },
            fragment: CommentFragmentDoc,
          })

          cache.modify({
            id: cache.identify({
              __typename: 'Post',
              id: postId,
            }),
            optimistic: true,
            fields: {
              commentsConnection(existingCommentRefs = {}) {
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
        }

        const newCommentAndRepliesRef = cache.writeFragment({
          fragmentName: 'CommentAndReplies',
          data: {
            ...addComment,
            user,
          },
          fragment: CommentAndRepliesFragmentDoc,
        })

        // Reply
        if (commentId) {
          cache.modify({
            id: cache.identify({
              __typename: 'Comment',
              id: commentId,
            }),
            fields: {
              repliesConnection(existingRepliesRefs = {}) {
                return {
                  ...existingRepliesRefs,
                  edges: [
                    {
                      __typename: 'CommentEdge',
                      cursor: -1,
                      node: newCommentAndRepliesRef,
                    },
                    ...existingRepliesRefs.edges,
                  ],
                  totalCount: existingRepliesRefs.totalCount + 1,
                }
              },
            },
          })
        } else {
          cache.modify({
            optimistic: true,
            fields: {
              comments(existingCommentRefs = {}) {
                return {
                  ...existingCommentRefs,
                  edges: [
                    {
                      __typename: 'CommentEdge',
                      cursor: -1,
                      node: newCommentAndRepliesRef,
                    },
                    ...existingCommentRefs.edges,
                  ],
                  totalCount: existingCommentRefs.totalCount + 1,
                }
              },
            },
          })
        }
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

          store.mention.mentionVar(lastKeyword.replace(MENTION.TRIGGER, ''))

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
    [showMention, dismissMention, setText, query]
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

      <View style={styles.inner}>
        <Avatar
          uri={data?.user.avatarUrl}
          fallback={data?.user.isSilhouette}
          fullName={data?.user.fullName}
        />
        <Input
          style={styles.input}
          ref={inputRef}
          onSubmitEditing={(text.length > 0 && handleSubmit) || null}
          placeholder={t('placeholder')}
          keyboardType="twitter"
          onChangeText={handleOnChangeText}
          value={text}
          height={COMMENT_FIELD_HEIGHT}
        />
        {text.length > 0 && (
          <Text fontSize={15} medium onPress={handleSubmit}>
            {t('post')}
          </Text>
        )}
      </View>
    </>
  )
}

export default CommentField
