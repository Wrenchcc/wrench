import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getPopularProjects } from 'graphql-old/queries/getExplore'
import { navigateToProject } from 'navigation-old/actions'
import { InfiniteList, Title } from 'ui'
import { Base, Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'

const ITEM_HEIGHT = 180

class Popular extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  renderItem = ({ item, index }) => {
    const { projects } = this.props
    const project = item.node
    const image = pathOr(null, ['files', 'edges', [0], 'node'], project)

    return (
      <Card
        image={image}
        title={project.title}
        key={project.id}
        onPress={() => navigateToProject({ project })}
        first={index === 0}
        last={index === projects && projects.length - 1}
        user={project.user}
      />
    )
  }

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage, t } = this.props

    return (
      <Base>
        <Header>
          <Title medium>{t('Popular:popular')}</Title>
        </Header>
        <InfiniteList
          getItemLayout={this.getItemLayout}
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
        <Footer>
          <Title medium>{t('Popular:recent')}</Title>
        </Footer>
      </Base>
    )
  }
}

export default compose(
  getPopularProjects,
  withTranslation('Popular')
)(Popular)
