import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { View } from 'react-native'
import Avatar from 'ui/Avatar'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    flexDirection: 'row',
  },
  users: {
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
  },
}

function UserStack({ users, onPress, size = 20 }) {
  return (
    <View style={styles.base}>
      <View style={styles.users}>
        {users.map(({ node }, index: number) => (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
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
          </Animated.View>
        ))}
      </View>
    </View>
  )
}

export default UserStack
