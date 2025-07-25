// @ts-nocheck
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { useTranslation } from 'i18n'
import Link from 'next/link'
import { Loader, Avatar, Text } from 'ui'
import { List, Base, Content, LoaderContainer, Empty } from './styles'

function Result({ query, onPress }) {
  const { t } = useTranslation('result')

  const {
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
  } = usePaginatedLazyQuery(['users'])(SearchUsersDocument)

  useEffect(() => {
    loadData({
      variables: {
        query,
      },
    })
  }, [query])

  return (
    <List>
      {!isFetching && edges?.length === 0 && <Empty>{t('not_found')}</Empty>}

      <InfiniteScroll
        loadMore={fetchMore}
        hasMore={hasNextPage}
        loader={
          <LoaderContainer>
            <Loader key={0} />
          </LoaderContainer>
        }
        useWindow={false}
      >
        {edges?.map(({ node }, index) => (
          <Base first={index === 0} key={node.id}>
            <Link href={`/${node.username}`}>
              <a>
                <Avatar size={40} uri={node.avatarUrl} isOnline={node.isOnline} onPress={onPress} />
                <Content onClick={onPress}>
                  <Text lineHeight={18}>{node.fullName}</Text>
                  <Text lineHeight={18} fontSize={15} color="neutral">
                    {t('projects', { count: node.projectCount })}
                  </Text>
                </Content>
              </a>
            </Link>
          </Base>
        ))}
      </InfiniteScroll>
    </List>
  )
}

export default Result
