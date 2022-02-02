import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { add } from 'images'
import { keyboardHeight, isIphone } from 'utils/platform'
import Form from './Form'
import { Base, Center, Text } from './styles'

const HALFPANEL_HEIGHT = 130

function AddCollection({ projectId, style = {}, disableModal }) {
  const { t } = useTranslation('add-collection')
  const { showHalfpanel, dismissHalfpanel } = useNavigation()

  const handleHalfPanel = useCallback(async () => {
    await dismissHalfpanel()

    showHalfpanel({
      height: HALFPANEL_HEIGHT + (isIphone ? keyboardHeight || 400 : 0), // default just to be sure
      renderContent: () => <Form projectId={projectId} disableModal={disableModal} />,
    })
  }, [showHalfpanel])

  return (
    <Base style={style}>
      <Center>
        <Icon source={add} onPress={handleHalfPanel} style={{ marginLeft: -2, marginTop: -2 }} />
      </Center>
      <Text fontSize={12}>{t('add')}</Text>
    </Base>
  )
}

export default AddCollection
