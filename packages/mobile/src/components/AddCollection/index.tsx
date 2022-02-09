import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Icon } from 'ui'
import { add } from 'images'
import { keyboardHeight, isIphone } from 'utils/platform'
import { Text } from 'ui'
import PlatformColor from 'ui/PlatformColor'
import Form from './Form'

const styles = {
  base: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: PlatformColor.divider,
    borderRadius: 60,
  },
  center: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
  icon: {
    marginLeft: -2,
    marginTop: -2,
  },
}

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
    <View style={[styles.base, style]}>
      <View style={styles.center}>
        <Icon source={add} onPress={handleHalfPanel} style={styles.icon} />
      </View>
      <Text fontSize={12} style={styles.text}>
        {t('add')}
      </Text>
    </View>
  )
}

export default AddCollection
