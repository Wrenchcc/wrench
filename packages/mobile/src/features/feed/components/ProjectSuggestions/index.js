import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { getProjectSuggestions } from 'graphql/queries/project/getProjectSuggestions'
import { ProjectSuggestion, Loader } from 'ui'
import { Base, Headline, Description } from './styles'

class ProjectSuggestions extends PureComponent {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  renderProjectSuggestions = ({ type, edges }) => (
    <ProjectSuggestion key={type.id} title={type.title} data={edges} />
  )

  render() {
    const { projects, isFetching, t } = this.props

    return (
      <Base>
        <Headline medium numberOfLines={0}>
          {t('ProjectSuggestions:headline')}
        </Headline>

        <Description color="grey" fontSize={19}>
          {t('ProjectSuggestions:description')}
        </Description>

        {isFetching && <Loader />}
        {projects.length > 0 && projects.map(this.renderProjectSuggestions)}
      </Base>
    )
  }
}

export default compose(
  getProjectSuggestions,
  withTranslation('ProjectSuggestions')
)(ProjectSuggestions)
