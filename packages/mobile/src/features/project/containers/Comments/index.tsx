import React, { useState, useCallback } from 'react'
import { KeyboardAvoidingView, FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { CommentsDocument, RepliesDocument, usePaginatedQuery } from '@wrench/common'
import { Page } from 'navigation'
import { NAVIGATION } from 'navigation/constants'
import CommentField from 'components/CommentField'
import { ActivityIndicator, CommentItem, Text } from 'ui'
import { update } from 'rambda'
import { isIphone } from 'utils/platform'

function Comments({ postId }) {
  const { t } = useTranslation()
  const [commentId, setCommentId] = useState()
  const [username, setUsername] = useState()

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
            <ActivityIndicator />
          ) : (
            <Text medium fontSize={14} color="accent" onPress={fetchMore}>
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

  const initialFetch = isFetching && !edges

  return (
    <Page headerTitle={t('Comments:title')} headerAnimation={false} view>
      <KeyboardAvoidingView behavior={isIphone && 'padding'} style={{ flex: 1 }}>
        <FlatList
          inverted
          initialNumToRender={8}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          keyExtractor={({ node }) => node.id}
          ListFooterComponent={renderTopComponent}
          ListEmptyComponent={
            initialFetch && (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
              </View>
            )
          }
          data={edges}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: NAVIGATION.TOP_BAR_HEIGHT * 2,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <CommentField postId={postId} username={username} commentId={commentId} emoji />
        </View>
      </KeyboardAvoidingView>
    </Page>
  )
}

export default Comments
