import React, { useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { navigateBack, dismissModal } from 'navigation'
import { Header, Text, Icon } from 'ui'
import { closeDark } from 'images'

function AddProjectHeader({
  actionRight,
  icon = closeDark,
  closeAction,
  translationKey = 'next',
  resetState,
  isSaving = false,
}) {
  const { t } = useTranslation()
  const handleActionLeft = useCallback(() => {
    if (closeAction) {
      dismissModal()
    } else {
      navigateBack()
    }

    if (resetState) {
      resetState()
    }
  }, [resetState, icon])

  const handleActionRight = useCallback(
    isSaving ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      actionRight && (
        <Text color="dark" medium onPress={actionRight}>
          {t(`AddProjectHeader:${translationKey}`)}
        </Text>
      )
    ),
    [isSaving, actionRight]
  )

  return (
    <Header
      headerLeft={<Icon onPress={handleActionLeft} source={icon} />}
      headerCenter={
        <Text color="dark" medium>
          {t('AddProjectHeader:headerTitle')}
        </Text>
      }
      headerRight={handleActionRight}
    />
  )
}

export default AddProjectHeader
