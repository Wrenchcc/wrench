import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery } from '@wrench/common'
import { AppNavigation, useNavigation, SCREENS } from 'navigation'
import Header from 'navigation/Page/Header'
import { Text, Title, Button } from 'ui'
import { requestNotificationToken } from 'utils/pushNotifications/register'

const styles = {
  headline: {
    marginBottom: 12,
    marginTop: 35,
  },
  description: {
    marginBottom: 80,
  },
}

function PushNotifications() {
  const { t } = useTranslation('push-notifications')
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
        <Title medium numberOfLines={0} style={styles.headline}>
          {t('title')}
        </Title>

        <Text color="neutral" fontSize={19} style={styles.description}>
          {t('description')}
        </Text>

        <View style={{ marginTop: 'auto', marginBottom: 80 }}>
          <Button color="inverse" onPress={handleNotifications}>
            {t('approve')}
          </Button>

          <Text color="inverse" medium onPress={handleSubmit} style={{ marginTop: 40 }} center>
            {t('decline')}
          </Text>
        </View>
      </View>
    </>
  )
}

export default PushNotifications
