import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'

const styles = {
  base: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
}

function User({ data, onPress }) {
  const { t } = useTranslation('user')
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => {
    if (onPress) {
      onPress(data)
    }

    navigate(SCREENS.USER, {
      user: data,
    })
  }, [data, onPress])

  return (
    <Touchable onPress={handleNavigation} hitSlop={5} style={styles.base}>
      <Avatar
        uri={data.avatarUrl}
        size={40}
        isOnline={data.isOnline}
        onPress={handleNavigation}
        fallback={data.isSilhouette}
        fullName={data.fullName}
      />
      <View style={styles.content}>
        <Text medium>{data.fullName}</Text>
        <Text color="accent" fontSize={15}>
          {t('projects', { count: data.projectCount })}
        </Text>
      </View>
    </Touchable>
  )
}

export default User
