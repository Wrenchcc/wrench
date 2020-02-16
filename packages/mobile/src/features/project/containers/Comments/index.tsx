import React, { useState, useCallback, useEffect } from 'react'
import { KeyboardAvoidingView, FlatList, View, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Navigation } from 'react-native-navigation'
import { CommentsDocument, RepliesDocument, usePaginatedQuery } from '@wrench/common'
import { NAVIGATION_COMPONENTS } from 'navigation/constants'
import CommentField from 'components/CommentField'
import { CommentItem, Text } from 'ui'
import { update } from 'rambda'
import { isIphone } from 'utils/platform'

const COMMENT_FIELD_HEIGHT_AND_EMOJI_LIST = 90

function Comments({ postId, componentId }) {
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

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          component: {
            name: NAVIGATION_COMPONENTS.HEADER_TITLE,
            passProps: {
              text: t('Comments:title'),
              headerAnimation: false,
            },
          },
        },
      },
    })
  }, [])

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

  const initialFetch = isFetching && !edges

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={isIphone && 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={COMMENT_FIELD_HEIGHT_AND_EMOJI_LIST}
      >
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
                <ActivityIndicator size="small" color="black" />
              </View>
            )
          }
          data={edges}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 20,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <CommentField postId={postId} username={username} commentId={commentId} emoji />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Comments
