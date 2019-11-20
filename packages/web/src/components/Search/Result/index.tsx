// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { Loader, Avatar, Text } from 'ui'
import { useDebounce } from 'hooks'
import { SEARCH_USER } from 'graphql/queries/search/searchUser'
import { List, Base, Content, LoaderContainer, Empty } from './styles'

function Result({ query, onPress }) {
  const { t } = useTranslation()
  const debouncedQuery = useDebounce(query, 50)

  const { data, loading } = useQuery(SEARCH_USER, {
    variables: {
      query: debouncedQuery,
    },
  })

  return (
    <List>
      {!loading && data.users.edges.length === 0 && <Empty>{t('Result:notfound')}</Empty>}

      <InfiniteScroll
        hasMore={data && data.users.pageInfo.hasNextPage}
        loader={
          <LoaderContainer>
            <Loader key={0} />
          </LoaderContainer>
        }
        useWindow={false}
      >
        {data &&
          data.users.edges.map(({ node }, index) => (
            <Base first={index === 0} key={node.id}>
              <Link href="/[username]" as={`/${node.username}`}>
                <a>
                  <Avatar
                    size={40}
                    uri={node.avatarUrl}
                    isOnline={node.isOnline}
                    onPress={onPress}
                  />
                  <Content onClick={onPress}>
                    <Text lineHeight={18}>{node.fullName}</Text>
                    <Text lineHeight={18} fontSize={15} color="light_grey">
                      {t('Result:projects', { count: node.projectCount })}
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
