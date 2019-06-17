import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Page, FlatList } from 'navigation'
import { getComments } from 'graphql/queries/comment/getComments'
import CommentField from 'components/CommentField'
import { CommentItem, KeyboardAccessoryView } from 'ui'

// TODO: Platform specific
const COMMENT_FIELD_OFFSET = 90

function Comments({
  comments,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  postId,
  fetchMoreReplies,
  post,
}) {
  const { t } = useTranslation()
  const [commentId, setCommentId] = useState()
  const [username, setUsername] = useState()

  const handleOnReply = useCallback(data => {
    setCommentId(data.commentId)
    setUsername(data.username)
  }, [])

  const renderHeader = () => {
    if (!post) {
      return null
    }

    return (
      <CommentItem
        first
        fetchMoreReplies={fetchMoreReplies}
        data={{
          node: {
            ...post,
            text: post.caption,
          },
        }}
      />
    )
  }

  const renderItem = ({ item }) => (
    <CommentItem data={item} onReply={handleOnReply} fetchMoreReplies={fetchMoreReplies} />
  )

  return (
    <Page
      headerAnimation={false}
      headerTitle={t('Comments:title')}
      stickyFooter={
        <KeyboardAccessoryView>
          <CommentField postId={postId} username={username} commentId={commentId} />
        </KeyboardAccessoryView>
      }
    >
      <FlatList
        paddingHorizontal={0}
        paddingBottom={COMMENT_FIELD_OFFSET}
        ListHeaderComponent={renderHeader}
        data={comments}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default getComments(Comments)
