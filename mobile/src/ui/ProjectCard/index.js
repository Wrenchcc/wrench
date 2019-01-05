import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { Gallery, Placeholder } from 'ui'
import { followProject } from 'graphql/mutations/project/followProject'
import { Base, Overlay, Content, Info, ProjectName, Followers, Button } from './styles'

class ProjectCard extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    followProject: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.any,
  }

  get renderImages() {
    const files = pathOr([], ['project', 'files', 'edges'], this.props)

    return files.length ? (
      <>
        <Overlay colors={['transparent', 'rgba(000, 000, 000, 0.7)']} locations={[0, 1]} />
        <Gallery files={files} />
      </>
    ) : (
      <Placeholder />
    )
  }

  render() {
    const { t, onPress, project, followProject, style } = this.props

    return (
      <Base onPress={onPress} style={style}>
        {this.renderImages}

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
}

export default compose(
  followProject,
  withNamespaces('ProjectCard')
)(ProjectCard)
