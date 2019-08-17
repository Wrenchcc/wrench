import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { followProject } from 'graphql/mutations/project/followProject'
import Image from 'ui/Image'
import Touchable from 'ui/Touchable'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

function ProjectCard({ onPress, project, followProject: followProjectMutation, style }) {
  const { t } = useTranslation()

  const handleFollow = useCallback(() => {
    followProjectMutation(project.id)
  }, [project])

  return (
    <Base style={style}>
      <Touchable onPress={onPress} style={{ height: '100%' }}>
        {!project.cover.default && (
          <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />
        )}
        <Image source={project.cover} height={180} />
      </Touchable>

      <Content>
        <Info>
          <ProjectName numberOfLines={1} color="white">
            {project.title}
          </ProjectName>
          <Followers followers={project.followers.totalCount} color="white" opacity={0.9} />
        </Info>

        {!project.permissions.isOwner && (
          <Button small background="white" onPress={handleFollow}>
            {project.permissions.isFollower ? t('ProjectCard:unfollow') : t('ProjectCard:follow')}
          </Button>
        )}
      </Content>
    </Base>
  )
}

export default followProject(ProjectCard)
