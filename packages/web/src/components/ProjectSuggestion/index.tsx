// @ts-nocheck
import React from 'react'
import { useFollowProjectMutation, useProjectSuggestionsQuery } from '@wrench/common'
import { useTranslation } from 'i18n'
import { Title, Layout, ProjectCard } from 'ui'
import { Category, Description } from './styles'

function ProjectSuggestion() {
  const { t } = useTranslation('project-suggestion')
  const [followProject] = useFollowProjectMutation()
  const { data, loading } = useProjectSuggestionsQuery({
    variables: {
      first: 6,
    },
  })

  const toggleFollow = project => {
    const totalCount = project.permissions.isFollower
      ? project.followers.totalCount - 1
      : project.followers.totalCount + 1

    const isFollower = !project.permissions.isFollower

    followProject({
      variables: {
        id: project.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        followProject: {
          id: project.id,
          ...project,
          followers: {
            ...project.followers,
            totalCount,
          },
          permissions: {
            ...project.permissions,
            isFollower,
          },
          __typename: 'Project',
        },
      },
    })
  }

  if (loading) {
    return null
  }

  return (
    <Layout
      column
      top={
        <>
          <Title medium>{t('TITLE')}</Title>
          <Description color="neutral">{t('DESCRIPTION')}</Description>
        </>
      }
    >
      {data.projects.map(({ edges, id, type }) => (
        <div key={id}>
          <Category>{type.title}</Category>

          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 50 }}>
            {edges.map(({ node }) => (
              <div
                key={node.id}
                style={{
                  width: 353,
                  paddingBottom: 20,
                  boxSizing: 'border-box',
                }}
              >
                <ProjectCard key={node.id} project={node} onFollow={toggleFollow} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default ProjectSuggestion
