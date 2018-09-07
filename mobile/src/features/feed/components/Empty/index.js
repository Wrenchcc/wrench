import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getPopularProjects } from 'graphql/queries/getExplore'
import { ProjectSuggestions } from 'ui'
import { Base, Headline, Description } from './styles'

// TODO: Navigate to projects
// Mutation
// Query
class Empty extends PureComponent {
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

        <ProjectSuggestions title="Cafe racers" data={projects} />
        <ProjectSuggestions title="Scramblers" data={projects} />
      </Base>
    )
  }
}

export default compose(
  getPopularProjects,
  translate('Empty')
)(Empty)
