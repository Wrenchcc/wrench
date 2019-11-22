// @ts-nocheck
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SIMILAR_PROJECTS_QUERY } from 'graphql/queries/project/similarProjects'
import { Card } from 'ui'
import { Inner, Scroll, Types } from './styles'

function SimilarProjects({ id }) {
  if (!id) {
    return null
  }

  const { data, loading } = useQuery(SIMILAR_PROJECTS_QUERY, {
    variables: {
      id,
      first: 6,
    },
  })

  if (loading) {
    return null
  }

  return (
    <Inner>
      <Scroll>
        <Types>
          {data.similarProjects.edges.map(({ node }) => (
            <Card
              marginLeft={10}
              marginBottom={40}
              key={node.id}
              image={node.cover.uri}
              title={node.title}
              slug={node.slug}
              user={node.user}
              size={172.5}
            />
          ))}
        </Types>
      </Scroll>
    </Inner>
  )
}

export default SimilarProjects
