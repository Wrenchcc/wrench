import React from 'react'
import { View, useColorScheme } from 'react-native'
import { Text, Avatar } from 'ui'

interface InAppNotificationProps {
  title: string
  body: string
  avatarUrl: string
}

const styles = {
  base: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginHorizontal: 10,
    paddingVertical: 12,
    boxShadow: '0 5px 7px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  content: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    flex: 1,
  },
}

const InAppNotification = ({ body, title, avatarUrl }: InAppNotificationProps) => {
  const colorScheme = useColorScheme()

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor:
            colorScheme === 'dark' ? 'rgba(25, 25, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        },
      ]}
    >
      <Avatar size={40} uri={avatarUrl} style={styles.avatar} />

      <View style={styles.content}>
        <Text fontSize={15} bold>
          {title}
        </Text>
        <Text fontSize={15} numberOfLines={2}>
          {body}
        </Text>
      </View>
    </View>
  )
}

export default InAppNotification
