// @ts-nocheck
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import { GET_COMMENTS } from 'graphql/queries/comments'
import CommentField from 'components/CommentField'
import { Avatar, Text, Loader } from 'ui'
import { Base, Footer, Inner, Scroll, Content } from './styles'

function Comments({ postId }) {
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
  })

  if (loading) {
    return null
  }

  return (
    <Base>
      <Scroll>
        <InfiniteScroll
          hasMore={data.comments.pageInfo.hasNextPage}
          loader={<Loader key={0} />}
          useWindow={false}
        >
          {data.comments.edges.map(({ node }) => (
            <Inner key={node.id}>
              <Link href="/[username]" as={`/${node.user.username}`}>
                <a>
                  <Avatar uri={node.user.avatarUrl} isOnline={node.user.isOnline} />
                </a>
              </Link>
              <Content>
                <Link href="/[username]" as={`/${node.user.username}`}>
                  <a>
                    <Text bold fontSize={15}>
                      {node.user.fullName}&nbsp;
                    </Text>
                  </a>
                </Link>

                <Text fontSize={15}>{node.text}</Text>
              </Content>
            </Inner>
          ))}
        </InfiniteScroll>
      </Scroll>

      <Footer>
        <CommentField postId={postId} />
      </Footer>
    </Base>
  )
}

export default Comments
