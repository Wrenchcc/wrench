import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getPopularProjects } from 'graphql/queries/getExplore'
import { InfiniteList } from 'ui'
import { Base, Headline, Description, Title, ProjectCard, GUTTER, BAR_SPACE, width } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

// TODO: Navigate to projects
// Mutation
// Query
class Empty extends PureComponent {
  renderItem = ({ item, index }) => (
    <ProjectCard
      first={index === 0}
      last={index === this.props.projects.length - 1}
      {...item.node}
      images={pathOr(null, ['node', 'images', 'edges'], item)}
      onPress={() => console.log('blah')}
    />
  )

  renderSection = () => {}

  render() {
    const { projects, fetchMore, refetch, isRefetching, isFetching, hasNextPage, t } = this.props

    return (
      <Base>
        <Headline medium numberOfLines={0}>
          {t('Empty:headline')}
        </Headline>

        <Description color="grey" fontSize={19} lineHeight={25}>
          {t('Empty:description')}
        </Description>

        <Title fontSize={21}>Cafe racers</Title>

        <InfiniteList
          keyExtractor={(item, index) => item.node.id + index}
          data={projects}
          horizontal
          directionalLockEnabled
          paddingHorizontal={0}
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

        <Title fontSize={21}>Scramblers</Title>

        <InfiniteList
          keyExtractor={(item, index) => item.node.id + index}
          data={projects}
          horizontal
          directionalLockEnabled
          paddingHorizontal={0}
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
      </Base>
    )
  }
}

export default compose(
  getPopularProjects,
  translate('Empty')
)(Empty)
