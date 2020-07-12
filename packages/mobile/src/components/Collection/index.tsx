import React from 'react'
import { Image } from 'ui'
import { useNavigation, SCREENS } from 'navigation'
import { Base, Text, Placeholder } from './styles'

function Collection({ id, name, projectId, image, style = {}, onPress }) {
  const { navigate } = useNavigation()

  const handleNavigate = () =>
    navigate(SCREENS.COLLECTION, {
      name,
      id,
      projectId,
    })

  return (
    <Base style={style} onPress={handleNavigate}>
      {image.uri ? (
        <Image source={image} width={60} height={60} borderRadius={60} />
      ) : (
        <Placeholder />
      )}
      <Text numberOfLines={1} fontSize={12} center>
        {name}
      </Text>
    </Base>
  )
}

export default Collection
