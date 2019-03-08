import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from 'react-apollo-hooks'
import { GET_NOTIFICATIONS } from '../../graphql/queries/notifications/notifications'
import { Avatar } from '../../ui'
import { Base } from './styles'

function Notifications() {
  const { data, fetchMore, loading } = useQuery(GET_NOTIFICATIONS)

  if (loading) return null

  return (
    <Base>
      <ul>
        <InfiniteScroll
          loadMore={() => console.log('fire')
            || fetchMore({
              variables: {
                after: data.notifications.edges[data.notifications.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev

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
          {data.notifications.edges.map(({ node }) => (
            <li key={node.id}>
              <Avatar uri={node.user.avatarUrl} />
              {node.user.fullName}
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </Base>
  )
}

export default Notifications
