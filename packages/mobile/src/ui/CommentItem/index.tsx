import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Item from './Item'
import { LoadReplies, Border } from './styles'

function CommentItem({ data, onReply, fetchMoreReplies, first, highlightId }) {
  const { t } = useTranslation()
  const handleLoadMore = useCallback(
    () =>
      fetchMoreReplies(
        data.node.id,
        data.node.replies.edges[data.node.replies.edges.length - 1].cursor
      ),
    [data.node.id]
  )

  return data.node.replies ? (
    <>
      <Item {...data.node} onReply={onReply} t={t} highlightId={highlightId} />
      {data.node.replies.edges.map(({ node }) => (
        <Item
          key={node.id}
          isReply
          {...node}
          commentId={data.node.id}
          t={t}
          onReply={onReply}
          highlightId={highlightId}
        />
      ))}

      {data.node.replies.totalCount > data.node.replies.edges.length && (
        <LoadReplies>
          <Border />
          <Text
            medium
            fontSize={12}
            color="light_grey"
            hapticFeedback="impactLight"
            onPress={handleLoadMore}
          >
            {t('CommentItem:loadReplies', {
              count: data.node.replies.totalCount - data.node.replies.edges.length,
            })}
          </Text>
        </LoadReplies>
      )}
    </>
  ) : (
    <Item {...data.node} t={t} first={first} onReply={onReply} highlightId={highlightId} />
  )
}

export default CommentItem
