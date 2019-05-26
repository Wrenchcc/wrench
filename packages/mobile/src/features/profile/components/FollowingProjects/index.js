import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { InfiniteList } from 'ui'
import { getFollowingProjects } from 'graphql/queries/user/getFollowingProjects'
import { navigateToProject } from 'navigation-old/actions'
import { Base, Title, Description, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

// TODO: Fetch more on end, fix scrollable
class FollowingProjects extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    projects: PropTypes.array,
    isFetching: PropTypes.bool,
    refetch: PropTypes.bool,
    fetchMore: PropTypes.bool,
    isRefetching: PropTypes.bool,
    hasNextPage: PropTypes.bool,
  }

  renderItem = ({ item }) => (
    <ProjectCard project={item.node} onPress={() => navigateToProject({ project: item.node })} />
  )

  render() {
    const {
      projects,
      isFetching,
      user,
      refetch,
      fetchMore,
      isRefetching,
      hasNextPage,
      t,
    } = this.props

    return (
      <Base>
        <Title>{t('FollowingProjects:title')}</Title>
        <Description>{t('FollowingProjects:description', { name: user.firstName })}</Description>

        <InfiniteList
          keyExtractor={item => item.node.id}
          data={projects}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          horizontal
          directionalLockEnabled
          paddingHorizontal={0}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          style={{
            marginLeft: -GUTTER,
            marginRight: -GUTTER,
          }}
        />
      </Base>
    )
  }
}

export default compose(
  getFollowingProjects,
  withTranslation('FollowingProjects')
)(FollowingProjects)
