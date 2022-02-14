import React from 'react'
import { View } from 'react-native'
import Avatar from 'ui/Avatar'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    flexDirection: 'row',
    display: 'flex',
  },
  users: {
    flexDirection: 'row',
    display: 'flex',
    marginRight: 5,
    marginLeft: 5,
  },
}

function UserStack({ users, onPress, size = 20 }) {
  return (
    <View style={styles.base}>
      <View style={styles.users}>
        {users.map(({ node }, index: number) => (
          <View
            key={node.id}
            size={size}
            style={{
              marginLeft: index === 0 ? 0 : -size / 2,
              borderWidth: 1,
              borderColor: PlatformColor.default,
              borderRadius: size,
            }}
          >
            <Avatar uri={node.avatarUrl} size={size} onPress={onPress} />
          </View>
        ))}
      </View>
    </View>
  )
}

export default UserStack
