import React from 'react'
import { ScrollView } from 'react-native'
import { pathOr } from 'ramda'
import { CardSmall } from 'ui'

function UserProjects({ projects }) {
  if (!projects || projects.edges.length <= 1) {
    return null
  }

  const renderItems = projects.edges.map(({ node }) => {
    const image = pathOr(null, ['files', 'edges', [0], 'node'], node)
    return (
      <CardSmall
        key={node.id}
        title={node.title}
        followers={node.followers.totalCount}
        image={image}
        style={{ marginRight: 10 }}
      />
    )
  })

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 50 }}>
      {renderItems}
    </ScrollView>
  )
}

export default UserProjects
