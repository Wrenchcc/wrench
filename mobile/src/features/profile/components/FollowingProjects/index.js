import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { pathOr } from 'ramda'
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
      <Fragment>
        <Title>{t('FollowingProjects:title')}</Title>
        <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>
      </Fragment>
    )
  }

  renderItem = ({ item }) => (
    <ProjectCard
      {...item.node}
      images={pathOr(null, ['node', 'images', 'edges'], item)}
      onPress={() => navigateToProject({ project: item.node })}
    />
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
  translate('FollowingProjects')
)(FollowingProjects)
