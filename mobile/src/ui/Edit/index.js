import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { navigateToEditProject } from 'navigation'
import { Text } from 'ui'

const Edit = ({ t, project }) => (
  <Text medium onPress={() => navigateToEditProject(project)}>
    {t('Edit:edit')}
  </Text>
)

Edit.propTypes = {
  project: PropTypes.object.isRequired,
}

export default withNamespaces('Edit')(Edit)
