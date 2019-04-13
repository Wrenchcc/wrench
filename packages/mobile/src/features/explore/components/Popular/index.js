import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { getPopularProjects } from 'graphql-old/queries/getExplore'
import { InfiniteList, Title } from 'ui'
import { Base, Header, Footer, Card, GUTTER, SNAP_INTERVAL } from './styles'

const ITEM_HEIGHT = 180

function Popular({ projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const renderItem = ({ item, index }) => {
    const project = item.node
    const image = pathOr(null, ['files', 'edges', [0], 'node'], project)

    return (
      <Card
        image={image}
        title={project.title}
        key={project.id}
        onPress={() => navigate(SCREENS.PROJECT, { slug: project.slug })}
        first={index === 0}
        last={index === projects && projects.length - 1}
        user={project.user}
      />
    )
  }

  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  return (
    <Base>
      <Header>
        <Title medium>{t('Popular:popular')}</Title>
      </Header>
      <InfiniteList
        initialNumToRender={2}
        getItemLayout={getItemLayout}
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
    </Base>
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

export default memo(getPopularProjects(Popular))
