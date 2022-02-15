import React from 'react'
import Touchable from 'ui/Touchable'
import Followers from 'ui/Followers'
import Text from 'ui/Text'
import Image from 'ui/Image'

const SIZE = 120

const styles = {
  name: {
    marginTop: 10,
    marginBottom: 5,
    width: SIZE,
  },
  image: {
    height: SIZE,
    width: SIZE,
  },
}

function CardSmall({ onPress, image, title, followers, style = {}, children }) {
  return (
    <Touchable onPress={onPress} style={style}>
      <Image source={image} style={styles.image} />
      {children}
      <Text fontSize={15} numberOfLines={1} style={styles.name}>
        {title}
      </Text>
      <Followers color="neutral" followers={followers} />
    </Touchable>
  )
}

export default CardSmall
