import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery } from '@wrench/common'
import { AppNavigation, useNavigation, SCREENS } from 'navigation'
import Header from 'navigation/Page/Header'
import { Text, Button } from 'ui'
import { requestNotificationToken } from 'utils/pushNotifications/register'
import { Headline, Description } from './styles'

function PushNotifications() {
  const { t } = useTranslation()
  const { data } = useCurrentUserQuery()
  const { showModal } = useNavigation()

  const handleSubmit = useCallback(
    () =>
      data.user.isSilhouette
        ? showModal(SCREENS.EDIT_PROFILE, {
            onboarding: true,
          })
        : AppNavigation(),
    [data]
  )

  const handleNotifications = useCallback(async () => requestNotificationToken(handleSubmit), [])

  return (
    <>
      <Header inline />
      <View style={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <Headline medium numberOfLines={0}>
          {t('PushNotifications:title')}
        </Headline>

        <Description color="neutral" fontSize={19}>
          {t('PushNotifications:description')}
        </Description>

        <View style={{ marginTop: 'auto', marginBottom: 80 }}>
          <Button color="inverse" onPress={handleNotifications}>
            {t('PushNotifications:approve')}
          </Button>

          <Text color="inverse" medium onPress={handleSubmit} style={{ marginTop: 40 }} center>
            {t('PushNotifications:decline')}
          </Text>
        </View>
      </View>
    </>
  )
}

export default PushNotifications
