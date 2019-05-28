import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Item from './Item'
import { LoadReplies, Border } from './styles'

function CommentItem({ data, onReply, fetchMoreReplies, first, highlightId }) {
  const { t } = useTranslation()

  return data.node.replies ? (
    <Fragment>
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

      {data.node.replies.pageInfo.hasNextPage && (
        <LoadReplies>
          <Border />
          <Text
            medium
            fontSize={12}
            color="light_grey"
            hapticFeedback="impactLight"
            onPress={() => fetchMoreReplies(
              data.node.id,
              data.node.replies.edges[data.node.replies.edges.length - 1].cursor
            )
            }
          >
            {t('CommentItem:loadReplies', {
              count: data.node.replies.totalCount - data.node.replies.edges.length,
            })}
          </Text>
        </LoadReplies>
      )}
    </Fragment>
  ) : (
    <Item {...data.node} t={t} first={first} onReply={onReply} highlightId={highlightId} />
  )
}

export default CommentItem
