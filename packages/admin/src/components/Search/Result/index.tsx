// @ts-nocheck
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Avatar from '../../Avatar'
import { List, Base, Content, LoaderContainer, Empty } from './styles'

const Username = styled.div`
  font-weight: 500;
  color: #222;
  margin-bottom: 2px;
`

const Projects = styled.div`
  color: #6d6f76;
`

function Result({ query, onPress }) {
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
      {!isFetching && edges?.length === 0 && <Empty>Not found</Empty>}

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
            <Link to={`/user/${node.username}`}>
              <Avatar size={40} src={node.avatarUrl} isOnline={node.isOnline} onPress={onPress} />
              <Content onClick={onPress}>
                <Username>{node.fullName}</Username>
                <Projects>{node.projectCount} projects</Projects>
              </Content>
            </Link>
          </Base>
        ))}
      </InfiniteScroll>
    </List>
  )
}

export default Result
