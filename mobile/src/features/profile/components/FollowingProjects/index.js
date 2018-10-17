import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { InfiniteList, ProjectCard } from 'ui'
import { getFollowingProjects } from 'graphql/queries/user/getFollowingProjects'
import { navigateToProject } from 'navigation'
import { Base, Title, Description } from './styles'

// TODO: Fallback to interested projects if no following
class FollowingProjects extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    projects: PropTypes.array,
  }

  headerComponent = () => {
    const { t, user } = this.props

    return (
      <>
        <Title>{t('FollowingProjects:title')}</Title>
        <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>
      </>
    )
  }

  renderItem = ({ item }) => (
    <ProjectCard project={item.node} onPress={() => navigateToProject({ project: item.node })} />
  )

  render() {
    const { projects, isFetching } = this.props

    return (
      <Base>
        <InfiniteList
          ListHeaderComponent={this.headerComponent}
          data={projects}
          keyExtractor={(item, index) => item.node.id + index}
          renderItem={this.renderItem}
          isFetching={isFetching}
        />
      </Base>
    )
  }
}

export default compose(
  getFollowingProjects,
  withNamespaces('FollowingProjects')
)(FollowingProjects)
