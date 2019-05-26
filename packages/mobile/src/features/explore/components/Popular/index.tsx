import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getPopularProjects } from 'graphql/queries/getExplore'
import { navigateToProject } from 'navigation/actions'
import { InfiniteList, Title } from 'ui'
import Placeholder from './Placeholder'
import { Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'

function Popular({ projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage, t }) {
  const renderItem = ({ item, index }) => {
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

  return (
    <Fragment>
      <Header>
        <Title medium>{t('Popular:popular')}</Title>
      </Header>
      <InfiniteList
        initialNumToRender={2}
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
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />
      <Footer>
        <Title medium>{t('Popular:recent')}</Title>
      </Footer>
    </Fragment>
  )
}

Popular.propTypes = {
  projects: PropTypes.array,
  fetchMore: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  isRefetching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
}

export default compose(
  getPopularProjects,
  withTranslation('Popular')
)(Popular)
