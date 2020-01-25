import React, { useState, useCallback } from 'react'
import { View, FlatList, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  usePaginatedQuery,
  useCommentQuery,
  usePostQuery,
  CommentsDocument,
  useRepliesLazyQuery,
} from '@wrench/common'
import Header from 'navigation/Page/Header'
import Post from 'components/Post'
import CommentField from 'components/CommentField'
import { CommentItem } from 'ui'

function PostContainer({ postId, commentId }) {
  const { t } = useTranslation()

  const [mention, setMention] = useState({
    commentId: null,
    username: null,
  })

  const [loadReplies] = useRepliesLazyQuery()

  const fetchMoreReplies = (id, after) =>
    loadReplies({
      variables: {
        after,
        id,
      },
    })

  const { data: commentData } = useCommentQuery({
    variables: {
      id: commentId,
    },
  })

  const { data: postData } = usePostQuery({
    variables: {
      id: postId,
    },
  })

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['comments'])(CommentsDocument, {
    variables: {
      postId,
    },
  })

  const highlightId = commentData && commentData.comment.id

  const handleOnReply = useCallback(data => setMention(data), [setMention])

  const renderItem = ({ item }) => (
    <CommentItem
      data={item}
      highlightId={highlightId}
      onReply={handleOnReply}
      fetchMoreReplies={fetchMoreReplies}
      postId={postId}
    />
  )

  const renderTopComponent = useCallback(() => {
    let content = []

    if (postData) {
      content = [
        <View style={{ paddingHorizontal: 20, marginBottom: 10 }} key="1">
          <Post post={postData.post} withoutComments paddingBottom={10} numberOfLines={0} />
        </View>,
      ]
    }

    if (hasNextPage) {
      content.push(
        <View style={{ paddingLeft: 60, height: 40 }} key="2">
          {isFetching ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text medium fontSize={14} color="light_grey" onPress={fetchMore}>
              {t('PostContainer:loadMore')}
            </Text>
          )}
        </View>
      )
    }

    return content
  }, [postData, hasNextPage, fetchMore, isFetching])

  const initialFetch = isFetching && !edges

  return (
    <View style={{ flex: 1 }}>
      <Header headerTitle={t('PostContainer:title')} headerAnimation={false} />

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
            paddingBottom: 90,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <CommentField
            postId={postId}
            username={mention.username}
            commentId={mention.commentId}
            emoji
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default PostContainer
