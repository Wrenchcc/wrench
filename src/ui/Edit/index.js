import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { navigateToEditProject } from 'navigation'
import { Text } from 'ui'

const Edit = ({ t, project }) => (
  <Text medium onPress={() => navigateToEditProject(project)}>
    {t('.edit')}
  </Text>
)

Edit.propTypes = {
  project: PropTypes.object.isRequired,
}

export default withLocalization(Edit, 'Edit')
