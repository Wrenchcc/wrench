// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { GET_NOTIFICATIONS } from 'graphql/queries/notifications/notifications'
import { Notification, Loader, Text } from 'ui'
import { Base, Empty, LoaderContainer } from './styles'

function Notifications() {
  const { t } = useTranslation()
  const { data, fetchMore, loading } = useQuery(GET_NOTIFICATIONS)

  if (loading) {
    return (
      <Base padding>
        <Loader />
      </Base>
    )
  }

  return (
    <Base>
      <ul>
        <InfiniteScroll
          threshold={20}
          loadMore={() =>
            fetchMore({
              variables: {
                after: data.notifications.edges[data.notifications.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev
                }

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
            <LoaderContainer>
              <Loader key={0} />
            </LoaderContainer>
          }
        >
          {data.notifications.edges.length > 0 ? (
            data.notifications.edges.map(({ node }, index) => (
              <Notification key={node.id} data={node} first={index === 0} />
            ))
          ) : (
            <Empty>
              <Text medium>{t('Notifications:title')}</Text>
              <Text color="grey" fontSize={15}>
                {t('Notifications:description')}
              </Text>
            </Empty>
          )}
        </InfiniteScroll>
      </ul>
    </Base>
  )
}

export default Notifications
