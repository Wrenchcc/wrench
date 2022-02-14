import React, { useCallback } from 'react'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import Image from 'ui/Image'
import { useNavigation, SCREENS } from 'navigation'

const styles = {
  name: {
    marginTop: 10,
    marginBottom: 5,
  },
}

function Card({ image, title, onPress, style = {}, user, size = 180 }) {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        user,
      }),
    [user]
  )

  return (
    <Touchable onPress={onPress} style={style}>
      <Image source={image} style={{ width: size, height: size }} />
      <Text numberOfLines={1} style={[styles.name, { width: size }]}>
        {title}
      </Text>
      <Touchable onPress={handleNavigation}>
        <Text fontSize={15} color="neutral" numberOfLines={1} style={{ width: size }}>
          {user.fullName}
        </Text>
      </Touchable>
    </Touchable>
  )
}

export default Card
