// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { usePaginatedQuery, NotificationsDocument } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { Notification, Loader, Text } from 'ui'
import { Base, Empty, LoaderContainer } from './styles'

function Notifications({ onPress }) {
  const { t } = useTranslation()

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['notifications'])(NotificationsDocument)
  console.log(edges)

  return null
  if (isFetching) {
    return (
      <Base padding>
        <Loader />
      </Base>
    )
  }

  return (
    <Base>
      <InfiniteScroll
        threshold={1}
        loadMore={fetchMore}
        useWindow={false}
        hasMore={hasNextPage}
        loader={
          <LoaderContainer>
            <Loader key={20} />
          </LoaderContainer>
        }
      >
        {edges?.length > 0 ? (
          edges.map(({ node }, index) => (
            <Notification key={node.id} data={node} first={index === 0} onPress={onPress} />
          ))
        ) : (
          <Empty>
            <Text medium>{t('Notifications:title')}</Text>
            <Text color="neutral" fontSize={15}>
              {t('Notifications:description')}
            </Text>
          </Empty>
        )}
      </InfiniteScroll>
    </Base>
  )
}

export default Notifications
