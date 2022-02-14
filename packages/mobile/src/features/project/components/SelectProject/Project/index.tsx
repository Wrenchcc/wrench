import React, { useCallback } from 'react'
import { Image, View } from 'react-native'
import { pathOr } from 'rambda'
import { Text, Followers, Touchable } from 'ui'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: PlatformColor.divider,
  },
  cover: {
    width: 40,
    height: 40,
  },
  middle: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 20,
  },
}

function Project({ id, files, title, followers, onPress }) {
  const image = pathOr(null, ['edges', 0, 'node'], files)
  const handleOnPress = useCallback(() => onPress(id), [id, onPress])

  return (
    <Touchable key={id} onPress={handleOnPress} style={styles.base}>
      {image && <Image source={image} style={styles.cover} />}

      <View style={styles.middle}>
        <View
          style={[
            styles.content,
            {
              marginLeft: !image ? 0 : 10,
            },
          ]}
        >
          <Text numberOfLines={1}>{title}</Text>
          <Followers color="neutral" followers={followers.totalCount} />
        </View>
      </View>
    </Touchable>
  )
}

export default Project
