import React from 'react'
import { pathOr } from 'ramda'
import { Card } from '../../ui'
import { Base, Title, List } from './styles'

function Popular({ projects }) {
  return (
    <Base>
      <Title medium>Popular projects</Title>

      <List>
        {projects.edges.map(({ node }) => (
          <Card
            key={node.id}
            image={pathOr(null, ['files', 'edges', [0], 'node', 'uri'], node)}
            title={node.title}
            slug={node.slug}
          />
        ))}
      </List>
    </Base>
  )
}

export default Popular
