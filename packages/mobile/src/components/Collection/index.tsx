import React, { useState } from 'react'
import { Image, ActivityIndicator } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, Text, Placeholder, Overlay, Item, ActivityIndicatorWrapper } from './styles'

function Collection({
  id,
  name,
  projectId,
  projectSlug,
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
        projectSlug,
        slug,
        isOwner,
      })
    }
  }

  return (
    <Base style={style} onPress={handleOnPress}>
      <Item>
        <Overlay selected={selected} />

        {isSaving && (
          <ActivityIndicatorWrapper>
            <ActivityIndicator />
          </ActivityIndicatorWrapper>
        )}

        {image?.uri ? (
          <Image source={image} width={60} height={60} borderRadius={60} />
        ) : (
          <Placeholder />
        )}
      </Item>
      <Text numberOfLines={1} fontSize={12} center>
        {name}
      </Text>
    </Base>
  )
}

export default Collection
