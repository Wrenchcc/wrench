import React, { useState, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { CommentsDocument, RepliesDocument, usePaginatedQuery } from '@wrench/common'
import { Page, keyExtractor } from 'navigation'
import { NAVIGATION } from 'navigation/constants'
import CommentField from 'components/CommentField'
import { ActivityIndicator, CommentItem, Text } from 'ui'
import { update } from 'rambda'

function Comments({ postId }) {
  const { t } = useTranslation('comments')
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

  // TODO: Convert to fieldPolicy
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
    (data) => {
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
              {t('loadMore')}
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
    <Page
      headerTitle={t('title')}
      headerAnimation={false}
      view
      keyboardVerticalOffset={-NAVIGATION.BOTTOM_TABS_HEIGHT}
    >
      <FlatList
        inverted
        initialNumToRender={8}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
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
      <View style={{ paddingHorizontal: 20, paddingBottom: NAVIGATION.BOTTOM_TABS_HEIGHT }}>
        <CommentField postId={postId} username={username} commentId={commentId} emoji />
      </View>
    </Page>
  )
}

export default Comments
