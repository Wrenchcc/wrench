import React from 'react'
import { useQuery, PUBLISHERS_QUERY } from 'gql'
import { COLORS } from 'ui/constants'
import { List, Item, Image } from './styles'

function Publishers() {
  const { data, loading } = useQuery(PUBLISHERS_QUERY)

  if (loading) {
    return null
  }

  return (
    <List
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        marginLeft: -20,
        marginRight: -20,
      }}
    >
      {data.publishers.edges.map(({ node }) => {
        return (
          <Item
            key={node.id}
            first={data.publishers.edges[0].node.id === node.id}
            last={data.publishers.edges[data.publishers.edges.length - 1].node.id === node.id}
          >
            <Image
              width={40}
              height={40}
              source={{ uri: node.logoUrl }}
              borderRadius={40}
              borderColor={COLORS.DIVIDER}
              borderWidth={1}
            />
          </Item>
        )
      })}
    </List>
  )
}

export default Publishers
