import React, { useCallback } from 'react'
import { View } from 'react-native'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import Avatar from 'ui/Avatar'

const styles = {
  base: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: 10,
    justifyContent: 'center',
  },
}

function MentionUser({ user, onPress }) {
  const handleOnPress = useCallback(() => onPress(user), [user])

  return (
    <Touchable onPress={handleOnPress} style={styles.base}>
      <Avatar
        uri={user.avatarUrl}
        size={40}
        fallback={user.isSilhouette}
        fullName={user.fullName}
      />
      <View style={styles.content}>
        <Text>{user.fullName}</Text>
      </View>
    </Touchable>
  )
}

export default MentionUser
