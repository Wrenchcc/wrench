import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getPopularProjects } from 'graphql/queries/getExplore'
import { navigateToProject } from 'navigation'
import { InfiniteList } from 'ui'
import { INITIAL_POSTS_COUNT } from '../../constants'
import { Title, Card, GUTTER, SNAP_INTERVAL } from './styles'

class Popular extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  renderItem = ({ item, index }) => {
    const { projects } = this.props
    const project = item.node
    const image = pathOr(null, ['images', 'edges', [0], 'node'], project)

    return (
      <Card
        image={image}
        title={project.title}
        key={project.id}
        onPress={() => navigateToProject({ project })}
        first={index === 0}
        last={index === projects && projects.length - 1}
      />
    )
  }

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage, t } = this.props

    return (
      <>
        <Title medium>{t('Popular:popular')}</Title>
        <InfiniteList
          initialNumToRender={INITIAL_POSTS_COUNT}
          keyExtractor={item => item.node.id}
          data={projects}
          horizontal
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: -GUTTER,
            marginRight: -GUTTER,
          }}
        />
        <Title medium>{t('Popular:recent')}</Title>
      </>
    )
  }
}

export default compose(
  getPopularProjects,
  withNamespaces('Popular')
)(Popular)
