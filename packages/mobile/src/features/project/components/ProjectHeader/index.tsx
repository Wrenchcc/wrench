import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Title, Follow, Icon } from 'ui'
import { arrowDown } from 'images'
import { useLazyQuery, SIMILAR_PROJECTS_QUERY } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { followProject } from 'graphql/mutations/project/followProject'
import SimilarProjects from '../SimilarProjects'
import { Base, Actions, Followers, OpenSimilar } from './styles'

function ProjectHeader({ project, spacingHorizontal, followProject: followProjectMutation }) {
  const { navigate } = useNavigation()
  // const [isOpen, setIsOpen] = useState(false)

  const [getSimilarProjects, { loading, fetchMore, data, isFetching, hasNextPage }] = useLazyQuery(
    SIMILAR_PROJECTS_QUERY,
    {
      variables: {
        id: project.id,
      },
    }
  )

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.FOLLOWERS, {
        id: project.id,
      }),
    [project]
  )

  const handleFollow = useCallback(() => {
    followProjectMutation(project.id)
    getSimilarProjects()
  }, [project, getSimilarProjects])

  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Title large numberOfLines={0}>
        {project.title}
      </Title>
      <Followers followers={project.followers.totalCount} onPress={handleNavigation} />
      <Actions>
        {project.permissions && !project.permissions.isOwner && (
          <Follow following={project.permissions.isFollower} onPress={handleFollow} />
        )}

        {false && (
          <OpenSimilar onPress={getSimilarProjects}>
            {loading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Icon source={arrowDown} color="dark" onPress={getSimilarProjects} />
            )}
          </OpenSimilar>
        )}
      </Actions>

      {data && data.similarProjects && (
        <SimilarProjects
          projects={data.similarProjects}
          fetchMore={fetchMore}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          onFollow={followProjectMutation}
        />
      )}
    </Base>
  )
}

export default followProject(ProjectHeader)
