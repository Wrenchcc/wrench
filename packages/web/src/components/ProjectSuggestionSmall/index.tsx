// @ts-nocheck
import React from 'react'
import { useFollowProjectMutation, useProjectSuggestionsQuery } from '@wrench/common'
import { useTranslation } from 'i18n'
import { Title, Text, ProjectCardSmall } from 'ui'
import { Inner } from './styles'

function ProjectSuggestion() {
  const { t } = useTranslation('project-suggestion')
  const [followProject] = useFollowProjectMutation()
  const { data, loading } = useProjectSuggestionsQuery({
    variables: {
      first: 5,
    },
  })

  const toggleFollow = (project) => {
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

  const edges = data.projects[(data.projects.length * Math.random()) | 0].edges

  return (
    <>
      <Text medium>{t('title_small')}</Text>
      <Inner>
        {edges.slice(0, 4).map(({ node }) => (
          <ProjectCardSmall key={node.id} project={node} onFollow={toggleFollow} />
        ))}
      </Inner>
    </>
  )
}

export default ProjectSuggestion
