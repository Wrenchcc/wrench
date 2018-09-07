import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getProjectSuggestions } from 'graphql/queries/project/getProjectSuggestions'
import { ProjectSuggestion } from 'ui'
import { Base, Headline, Description } from './styles'

class ProjectSuggestions extends PureComponent {
  static propTypes = {
    projects: PropTypes.object.isRequired,
  }

  renderProjectSuggestions = ({ category, edges }) => (
    <ProjectSuggestion key={category.id} title={category.title} data={edges} />
  )

  render() {
    const { projects, t } = this.props

    return (
      <Base>
        <Headline medium numberOfLines={0}>
          {t('ProjectSuggestions:headline')}
        </Headline>

        <Description color="grey" fontSize={19} lineHeight={25}>
          {t('ProjectSuggestions:description')}
        </Description>

        {projects && projects.map(this.renderProjectSuggestions)}
      </Base>
    )
  }
}

export default compose(
  getProjectSuggestions,
  translate('ProjectSuggestions')
)(ProjectSuggestions)
