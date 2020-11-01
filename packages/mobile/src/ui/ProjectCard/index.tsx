import React, { useCallback } from 'react'
import { useFollowProjectMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useResponsiveHeight } from 'react-native-responsive-dimensions'
import Image from 'ui/Image'
import Touchable from 'ui/Touchable'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

function ProjectCard({ onPress, onFollow, project, style }) {
  const { t } = useTranslation('project-card')
  const [followProject] = useFollowProjectMutation()
  const height = useResponsiveHeight(24)

  const handleFollow = useCallback(() => {
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

    if (onFollow) {
      onFollow(project)
    }
  }, [project, onFollow])

  return (
    <Base style={style} height={height}>
      <Touchable onPress={onPress}>
        {!project.cover.default && (
          <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />
        )}
        <Image source={project.cover} height={height} />

        <Content>
          <Info>
            <ProjectName numberOfLines={1} color="white">
              {project.title}
            </ProjectName>
            <Followers followers={project.followers.totalCount} color="white" opacity={0.9} />
          </Info>

          {!project.permissions.isOwner && (
            <Button small color="inverse" onPress={handleFollow}>
              {project.permissions.isFollower ? t('unfollow') : t('follow')}
            </Button>
          )}
        </Content>
      </Touchable>
    </Base>
  )
}

export default ProjectCard
