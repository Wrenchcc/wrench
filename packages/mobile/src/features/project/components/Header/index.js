import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Title } from 'ui'
import { navigateToFollowers } from 'navigation/actions'
import { Base, ProjectName, Followers } from './styles'

export default class Header extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    spacingHorizontal: PropTypes.bool.isRequired,
  }

  goToFollowers = () => {
    const { project } = this.props
    navigateToFollowers({ project })
  }

  render() {
    const { project, spacingHorizontal } = this.props
    return (
      <Base spacingHorizontal={spacingHorizontal}>
        <ProjectName>
          <Title large>{project.title}</Title>
          <Followers followers={project.followers.totalCount} onPress={this.goToFollowers} />
        </ProjectName>
      </Base>
    )
  }
}
