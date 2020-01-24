import React, { useState, useCallback } from 'react'
import { KeyboardAvoidingView, FlatList, View, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  CommentFragmentDoc,
  CommentsDocument,
  CurrentUserDocument,
  optimisticId,
  PostFragmentDoc,
  useAddCommentMutation,
  RepliesDocument,
  usePaginatedQuery,
} from '@wrench/common'
import Header from 'navigation/Page/Header'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView, Text } from 'ui'
import { isIphone } from 'utils/platform'
import { logError } from 'utils/sentry'
import { update, pathOr } from 'rambda'

const COMMENT_FIELD_OFFSET = isIphone ? 120 : 40

function Comments({ postId }) {
  const { t } = useTranslation()
  const [commentId, setCommentId] = useState()
  const [username, setUsername] = useState()
  const [addComment] = useAddCommentMutation()

  const {
    data: { edges, post },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['comments'])(CommentsDocument, {
    variables: {
      postId,
    },
  })

  const fetchReplies = ({ id, after }) =>
    fetchMore({
      query: RepliesDocument,
      variables: {
        after,
        id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.comment.replies) {
          return prev
        }

        const index = prev.comments.edges.findIndex(({ node }) => node.id === id)

        return {
          ...prev,
          comments: {
            ...prev.comments,
            edges: update(
              index,
              {
                ...prev.comments.edges[index],
                node: {
                  ...prev.comments.edges[index].node,
                  replies: {
                    ...prev.comments.edges[index].node.replies,
                    ...fetchMoreResult.comment.replies,
                    edges: [
                      ...prev.comments.edges[index].node.replies.edges,
                      ...fetchMoreResult.comment.replies.edges,
                    ],
                  },
                },
              },
              prev.comments.edges
            ),
          },
        }
      },
    })

  const handleOnReply = useCallback(
    data => {
      setCommentId(data.commentId)
      setUsername(data.username)
    },
    [setCommentId, setUsername]
  )

  const handleSubmit = useCallback(
    text => {
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
            createdAt: new Date().toISOString(),
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

          // Post
          try {
            const data = cache.readFragment({
              id: `Post:${postId}`,
              fragment: PostFragmentDoc,
              fragmentName: 'Post',
            })
            cache.writeFragment({
              id: `Post:${postId}`,
              fragment: PostFragmentDoc,
              fragmentName: 'Post',
              data: {
                ...data,
                comments: {
                  ...data.comments,
                  edges: [
                    {
                      node: {
                        id: optimisticId(),
                        ...addComment,
                        user,
                        __typename: 'Comment',
                      },
                      __typename: 'CommentEdge',
                    },
                    ...data.comments.edges,
                  ],
                  totalCount: data.comments.totalCount + 1,
                },
              },
            })
          } catch (err) {
            logError(err)
          }

          try {
            // Is reply
            if (commentId) {
              // Get comment fragment
              const data = cache.readFragment({
                id: `Comment:${commentId}`,
                fragment: CommentFragmentDoc,
                fragmentName: 'Comment',
              })

              // Add to bottom of replies
              cache.writeFragment({
                id: `Comment:${commentId}`,
                fragment: CommentFragmentDoc,
                fragmentName: 'Comment',
                data: {
                  ...data,
                  replies: {
                    ...pathOr({}, ['replies'], data),
                    edges: [
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
                          user,
                          __typename: 'Comment',
                        },
                        __typename: 'CommentEdge',
                      },
                      ...pathOr({}, ['replies', 'edges'], data),
                    ],
                    totalCount: pathOr(0, ['replies', 'totalCount'], data) + 1,
                  },
                },
              })
            } else {
              const data = cache.readQuery({
                query: CommentsDocument,
                variables: {
                  postId,
                },
              })

              const comments = {
                ...data,
                comments: {
                  ...data.comments,
                  edges: [
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
                        user,
                        __typename: 'Comment',
                      },
                      __typename: 'CommentEdge',
                    },
                    ...data.comments.edges,
                  ],
                },
              }

              cache.writeQuery({
                query: CommentsDocument,
                variables: {
                  postId,
                },
                data: comments,
              })
            }
          } catch (err) {
            logError(err)
          }
        },
      })
    },
    [postId, commentId]
  )

  const renderTopComponent = useCallback(() => {
    let content = []

    if (post) {
      content = [
        <CommentItem
          key="1"
          first
          fetchReplies={fetchReplies}
          data={{
            node: {
              ...post,
              text: post.caption,
            },
          }}
        />,
      ]
    }

    if (hasNextPage) {
      content.push(
        <View style={{ paddingLeft: 60, height: 40 }} key="2">
          {isFetching ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text medium fontSize={14} color="light_grey" onPress={fetchMore}>
              {t('Comments:loadMore')}
            </Text>
          )}
        </View>
      )
    }

    return content
  }, [post, hasNextPage, fetchMore, isFetching])

  const renderItem = ({ item }) => (
    <CommentItem data={item} onReply={handleOnReply} fetchReplies={fetchReplies} postId={post.id} />
  )

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 60,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
          borderBottomWidth: 1,
        }}
      />

      <Header headerTitle={t('Comments:title')} headerAnimation={false} />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <FlatList
          inverted
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          keyExtractor={({ node }) => node.id}
          ListFooterComponent={renderTopComponent}
          data={edges}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 90,
            paddingTop: COMMENT_FIELD_OFFSET,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        />
      </KeyboardAvoidingView>

      <KeyboardAccessoryView extraHeight={60}>
        <CommentField
          postId={postId}
          username={username}
          commentId={commentId}
          emoji
          onSubmit={handleSubmit}
        />
      </KeyboardAccessoryView>
    </View>
  )
}

export default Comments
