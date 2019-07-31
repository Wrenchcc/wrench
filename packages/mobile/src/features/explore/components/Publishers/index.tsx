import React from 'react'
import { useQuery, PUBLISHERS_QUERY } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { COLORS } from 'ui/constants'
import { Base, List, Item, Image } from './styles'

function Publishers() {
  const { navigate } = useNavigation()
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
          <Base
            onPress={() => navigate(SCREENS.ARTICLES, { ...node })}
            key={node.id}
            first={data.publishers.edges[0].node.id === node.id}
            last={data.publishers.edges[data.publishers.edges.length - 1].node.id === node.id}
            seen={node.seen}
          >
            <Item>
              <Image
                width={40}
                height={40}
                source={{ uri: node.logoUrl }}
                borderRadius={40}
                borderColor={COLORS.DIVIDER}
                borderWidth={1}
              />
            </Item>
            <Text fontSize={12} color="grey" numberOfLines={1} center>
              {node.name}
            </Text>
          </Base>
        )
      })}
    </List>
  )
}

export default Publishers
