import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { pathOr } from 'ramda'
import Placeholder from 'ui/Placeholder'
import { followProject } from 'graphql/mutations/project/followProject'
import Image from 'ui/Image'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

function ProjectCard({ onPress, project, followProject: followProjectMutation, style }) {
  const { t } = useTranslation()
  const renderImages = useCallback(() => {
    const image = pathOr(false, ['files', 'edges', 0, 'node'], project)
    return image ? (
      <>
        <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />
        <Image source={image} height={180} />
      </>
    ) : (
      <Placeholder />
    )
  }, [project])

  const handleFollow = useCallback(() => followProjectMutation(project.id), [project])

  return (
    <Base onPress={onPress} style={style}>
      {renderImages()}

      <Content>
        <Info>
          <ProjectName numberOfLines={1} color="white">
            {project.title}
          </ProjectName>
          <Followers followers={project.followers.totalCount} color="white" opacity={0.9} />
        </Info>
        {!project.projectPermissions.isOwner && (
          <Button small background="white" onPress={handleFollow}>
            {project.projectPermissions.isFollower
              ? t('ProjectCard:unfollow')
              : t('ProjectCard:follow')}
          </Button>
        )}
      </Content>
    </Base>
  )
}

export default followProject(ProjectCard)
