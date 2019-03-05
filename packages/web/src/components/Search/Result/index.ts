import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useQuery } from 'react-apollo-hooks'
import { Loader, Avatar, Text } from '../../../ui'
import { SEARCH_USER } from '../../../graphql/queries/search/searchUser'
import { List, Base, Content } from './styles'

function Result({ query, onPress }) {
  const { t } = useTranslation()
  const { data, loading } = useQuery(SEARCH_USER, {
    variables: { query },
  })

  if (loading) {
    return null
  }

  return (
    <List>
      <InfiniteScroll
        hasMore={data.users.pageInfo.hasNextPage}
        loader={<Loader key={0} />}
        useWindow={false}
      >
        {data.users
          && data.users.edges.map(({ node }, index) => (
            <Base first={index === 0} onClick={onPress} key={node.id}>
              <Link
                href={{
                  pathname: '/user',
                  query: { username: node.username },
                }}
                as={{
                  pathname: `/${node.username}`,
                }}
              >
                <a>
                  <Avatar size={40} uri={node.avatarUrl} />
                  <Content>
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
