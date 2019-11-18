// @ts-nocheck
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_PROJECT_SUGGESTIONS } from 'graphql/queries/project/projectSuggestions'
import { Title, Layout, ProjectCard } from 'ui'
import { Category, Description } from './styles'

function ProjectSuggestion() {
  const { data, loading } = useQuery(GET_PROJECT_SUGGESTIONS)

  if (loading) {
    return null
  }

  return (
    <Layout
      column
      top={
        <>
          <Title medium>
            Get up to speed and follow <br />
            some projects.
          </Title>
          <Description color="grey">
            We’ve selected some categories below you may find interesting.{' '}
          </Description>
        </>
      }
    >
      {data.projects.map(({ edges, id, type }) => (
        <div key={id}>
          <Category>{type.title}</Category>

          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 50 }}>
            {edges.map(({ node }) => (
              <div
                style={{
                  width: 353,
                  // paddingRight: 20,
                  paddingBottom: 20,
                  boxSizing: 'border-box',
                }}
              >
                <ProjectCard
                  key={node.id}
                  image={node.cover.uri}
                  user={node.user}
                  slug={node.slug}
                  title={node.title}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default ProjectSuggestion
