import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/react-hooks'
import { GET_NOTIFICATIONS } from '../../graphql/queries/notifications/notifications'
import { Notification } from '../../ui'
import { Base } from './styles'

function Notifications() {
  const { data, fetchMore, loading } = useQuery(GET_NOTIFICATIONS)

  if (loading) { return null }

  return (
    <Base>
      <ul>
        <InfiniteScroll
          loadMore={() =>
            fetchMore({
              variables: {
                after: data.notifications.edges[data.notifications.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return prev }

                return {
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    pageInfo: {
                      ...prev.notifications.pageInfo,
                      ...fetchMoreResult.notifications.pageInfo,
                    },
                    edges: [...prev.notifications.edges, ...fetchMoreResult.notifications.edges],
                  },
                }
              },
            })
          }
          useWindow={false}
          hasMore={data.notifications.pageInfo.hasNextPage}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {data.notifications.edges.map(({ node }, index) => (
            <Notification key={node.id} data={node} first={index === 0} />
          ))}
        </InfiniteScroll>
      </ul>
    </Base>
  )
}

export default Notifications
