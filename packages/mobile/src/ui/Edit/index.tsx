import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'

type Props = {
  project: object
}

function Edit({ t, project }: Props) {
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(() => showModal(SCREENS.EDIT_PROJECT, { project }), [
    project,
  ])

  return (
    <Text medium onPress={handleNavigation}>
      {t('Edit:edit')}
    </Text>
  )
}

export default withTranslation('Edit')(Edit)
