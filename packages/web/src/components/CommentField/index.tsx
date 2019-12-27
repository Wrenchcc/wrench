// @ts-nocheck
import React, { memo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Mention, MentionsInput } from 'react-mentions'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { prepend, append } from 'ramda'
import { useCurrentUserQuery } from '@wrench/common'
import optimisticId from 'utils/optimisticId'
import { GET_COMMENTS } from 'graphql/queries/comments'
import { ADD_COMMENT_MUTATION } from 'graphql/mutations/comment/addComment'
import { SEARCH_USER } from 'graphql/queries/search/searchUser'
import postInfo from 'graphql/fragments/post/postInfo'
import commentInfo from 'graphql/fragments/comment/commentInfo'
import { Avatar, Text } from 'ui'
import { COLORS } from 'ui/constants'
import { useCookie, Cookies } from 'hooks'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base, Inner, Button, Username } from './styles'
import { useRouter } from 'next/router'

const DEFAULT_AVATAR_URL = 'https://edge-files.wrench.cc/avatar/default.jpg'

const styles = {
  width: '100%',
  display: 'flex',
  padding: 0,

  suggestions: {
    top: 20,
    left: 0,
    width: 375,
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.11)',
    backgroundColor: 'white',

    list: {
      backgroundColor: 'white',
      border: 'none',
      fontSize: 16,
      color: 'black',
      position: 'absolute',
      width: 375,
      maxHeight: 368,
      overflow: 'auto',
    },

    item: {
      padding: '0 20px',
      boxSizing: 'border-box',
      height: 70,
      borderBottom: '1px solid rgba(0,0,0,0.15)',

      '&focused': {
        backgroundColor: '#e6e7e9',
      },
    },
  },

  input: {
    border: 0,
    width: '100%',
    outline: 'none',
    fontSize: 16,
    color: COLORS.DARK,
    marginLeft: 10,
    display: 'flex',
    padding: 0,
    top: 5,
    height: 30,
  },
}

const CommentField = React.forwardRef(({ postId, commentId, initialValue = '' }, ref) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isAuthenticated] = useCookie(Cookies.ACCESS_TOKEN)
  const [text, setText] = useState('')

  const currentUser = useCurrentUserQuery({
    skip: !isAuthenticated,
  })

  const [searchUser, { data }] = useLazyQuery(SEARCH_USER)
  const [addCommentMutation] = useMutation(ADD_COMMENT_MUTATION)

  async function fetchUsers(query, callback) {
    if (!query) return

    searchUser({
      variables: {
        query,
        type: 'USERS',
      },
    })

    if (data) {
      callback(
        data.users.edges.map(({ node }) => ({
          id: node.id,
          display: node.username,
          avatarUrl: node.avatarUrl,
        }))
      )
    }
  }

  const renderItem = ({ id, display, avatarUrl }) => {
    return (
      <div
        key={id}
        style={{ display: 'flex', height: 70, flexDirection: 'row', alignItems: 'center' }}
      >
        <Avatar size={40} uri={avatarUrl} />
        <Username medium>{display}</Username>
      </div>
    )
  }

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const handleOnChangeText = useCallback(
    ({ target }) => {
      // TODO: Fix
      const text = target.value.replace('[', '').replace(']', '')
      setText(text)
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

        <MentionsInput
          style={styles}
          ref={ref}
          placeholder={t('CommentField:placeholder')}
          onChange={handleOnChangeText}
          onFocus={handleFocus}
          value={text}
          onKeyDown={handleOnKeyDown}
          allowSpaceInQuery
          singleLine
        >
          <Mention
            appendSpaceOnAdd
            markup="@[__display__]"
            displayTransform={(_, display) => `@${display}`}
            trigger="@"
            data={fetchUsers}
            style={{ left: 0 }}
            renderSuggestion={renderItem}
          />
        </MentionsInput>

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
