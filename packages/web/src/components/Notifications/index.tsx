// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { usePaginatedQuery, NotificationsDocument } from '@wrench/common'
import { useTranslation } from 'i18n'
import { Notification, Loader, Text } from 'ui'
import { Base, Empty, LoaderContainer } from './styles'

function Notifications({ onPress }) {
  const { t } = useTranslation('Notifications')

  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['notifications'])(NotificationsDocument)

  if (isFetching || !edges.length) {
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
            <Text medium>{t('title')}</Text>
            <Text color="neutral" fontSize={15}>
              {t('description')}
            </Text>
          </Empty>
        )}
      </InfiniteScroll>
    </Base>
  )
}

export default Notifications
