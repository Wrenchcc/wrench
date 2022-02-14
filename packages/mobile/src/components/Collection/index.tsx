import React, { useState } from 'react'
import { View } from 'react-native'
import { Image, ActivityIndicator, Touchable, Text } from 'ui'
import PlatformColor from 'ui/PlatformColor'
import { useNavigation, SCREENS } from 'navigation'

const styles = {
  base: {
    width: 60,
  },
  text: {
    marginTop: 8,
  },
  placeholder: {
    width: 60,
    height: 60,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    backgroundColor: PlatformColor.placeholder,
  },
  item: {
    height: 60,
  },
  indicator: {
    position: 'absolute',
    zIndex: 1,
    height: 60,
    width: 60,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 1,
    borderWidth: 2,
  },
}

function Collection({
  id,
  name,
  projectId,
  slug,
  isOwner,
  image,
  onPress,
  onSave,
  selected,
  style = {},
}) {
  const [isSaving, setSaving] = useState(false)

  const { navigate } = useNavigation()

  const handleOnPress = () => {
    if (onSave) {
      onSave(id)
      setSaving(true)
      return
    }

    if (onPress) {
      onPress(id)
    } else {
      navigate(SCREENS.COLLECTIONS, {
        name,
        id,
        projectId,
        slug,
        isOwner,
      })
    }
  }

  return (
    <Touchable style={[styles.base, style]} onPress={handleOnPress}>
      <View style={styles.item}>
        <View
          style={[
            styles.overlay,
            {
              borderColor: selected ? 'white' : 'transparent',
              backgroundColor: selected ? 'rgba(000, 000, 000, 0.2)' : 'transparent',
            },
          ]}
        />

        {isSaving && (
          <View style={styles.indicator}>
            <ActivityIndicator />
          </View>
        )}

        {image?.uri ? (
          <Image source={image} width={60} height={60} borderRadius={60} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text numberOfLines={1} fontSize={12} center style={styles.text}>
        {name}
      </Text>
    </Touchable>
  )
}

export default Collection
