import React, { memo } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { navigateToEditProject } from 'navigation/actions'
import Text from 'ui/Text'

const Edit = memo(function Edit({ t, project }) {
  return (
    <Text medium onPress={() => navigateToEditProject({ project })}>
      {t('Edit:edit')}
    </Text>
  )
})

Edit.propTypes = {
  project: PropTypes.object.isRequired,
}

export default withTranslation('Edit')(Edit)
