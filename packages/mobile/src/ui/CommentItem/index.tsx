import React from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'
import Item from './Item'
import { LoadReplies, Border } from './styles'

function CommentItem({ t, data, onReply, fetchMoreReplies, first, highlightId }) {
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
    </>
  ) : (
    <Item {...data.node} t={t} first={first} onReply={onReply} highlightId={highlightId} />
  )
}

CommentItem.propTypes = {
  highlightId: PropTypes.string,
  data: PropTypes.object.isRequired,
  fetchMoreReplies: PropTypes.func,
  first: PropTypes.bool,
  onReply: PropTypes.func,
}

export default withTranslation('CommentItem')(CommentItem)
