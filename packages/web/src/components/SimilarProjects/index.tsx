// @ts-nocheck
import React from 'react'
import { useSimilarProjectsQuery } from '@wrench/common'
import { Card, Loader } from 'ui'
import { Inner, Scroll, Types, LoaderContainer } from './styles'

function SimilarProjects({ id, closeModal }) {
  const { data, loading } = useSimilarProjectsQuery({
    variables: {
      id,
      first: 6,
    },
  })

  if (loading) {
    return (
      <LoaderContainer fullscreen>
        <Loader />
      </LoaderContainer>
    )
  }

  return (
    <Inner>
      <Scroll>
        <Types>
          {data.similarProjects.edges.map(({ node }) => (
            <Card
              onPress={closeModal}
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
