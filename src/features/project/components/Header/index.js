import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Title } from 'ui'
import { navigateToFollowers } from 'navigation'
import { Base, ProjectName, Followers } from './styles'

// TODO: PropTypes
export default class Header extends PureComponent {
  static propTypes = {
    // name: PropTypes.string.isRequired,
    // followers: PropTypes.number.isRequired,
  }

  goToFollowers = () => {
    const { project } = this.props
    navigateToFollowers({ project })
  }

  render() {
    const { project } = this.props
    return (
      <Base>
        <ProjectName>
          <Title large>{project.title}</Title>
          <Followers
            followers={project.followersConnection.totalCount}
            onPress={this.goToFollowers}
          />
        </ProjectName>
      </Base>
    )
  }
}
