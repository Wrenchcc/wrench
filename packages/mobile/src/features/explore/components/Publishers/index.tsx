import React from 'react'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { Base, List, Item, Image } from './styles'

function Publishers({ data }) {
  const { navigate } = useNavigation()

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
        const handleNavigation = () => navigate(SCREENS.ARTICLES, { ...node })

        return (
          <Base
            onPress={handleNavigation}
            key={node.id}
            first={data.publishers.edges[0].node.id === node.id}
            last={data.publishers.edges[data.publishers.edges.length - 1].node.id === node.id}
          >
            <Item seen={node.seen}>
              <Image width={40} height={40} source={{ uri: node.logoUrl }} borderRadius={40} />
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
