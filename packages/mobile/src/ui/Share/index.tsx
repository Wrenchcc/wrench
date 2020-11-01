import React, { useCallback } from 'react'
import { Image } from 'react-native'
import NativeShare from 'react-native-share'
import { useTranslation } from 'react-i18next'
import { track, events } from 'utils/analytics'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'
import { share } from 'images'

function Share({ text, url, title }) {
  const { t } = useTranslation('share')

  const handleShare = useCallback(() => {
    track(events.PROJECT_SHARE_OPEN)

    NativeShare.open({
      title,
      url,
    }).catch(() => {
      track(events.PROJECT_SHARE_CLOSED)
    })
  }, [title, url])

  return (
    <Touchable onPress={handleShare} hitSlop={20}>
      {text ? <Text medium>{t('share')}</Text> : <Image source={share} />}
    </Touchable>
  )
}

export default Share
