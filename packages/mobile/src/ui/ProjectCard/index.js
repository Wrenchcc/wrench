import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import Gallery from 'ui/Gallery'
import Placeholder from 'ui/Placeholder'
import { followProject } from 'graphql/mutations/project/followProject'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

function ProjectCard({ t, onPress, project, followProject, style }) {
  const renderImages = useCallback(() => {
    const files = pathOr([], ['files', 'edges'], project)

    return files.length ? (
      <>
        <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />
        <Gallery files={files} />
      </>
    ) : (
      <Placeholder />
    )
  }, [])

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
          <Button
            small
            background="white"
            onPress={() => followProject(project.id)}
            hapticFeedback="impactLight"
          >
            {project.projectPermissions.isFollower
              ? t('ProjectCard:unfollow')
              : t('ProjectCard:follow')}
          </Button>
        )}
      </Content>
    </Base>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  followProject: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default compose(
  followProject,
  withTranslation('ProjectCard')
)(ProjectCard)
