import React, { useCallback } from 'react'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import { useNavigation, SCREENS } from 'navigation'
import { Picture, ProjectName, SIZE } from './styles'

function Card({ image, title, onPress, style = {}, user }) {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.USER, {
        user,
      }),
    [user]
  )

  return (
    image && (
      <Touchable onPress={onPress} style={style}>
        <Picture source={image} width={SIZE} height={SIZE} />
        <ProjectName numberOfLines={1}>{title}</ProjectName>
        <Touchable onPress={handleNavigation}>
          <Text fontSize={15} color="grey">
            {user.fullName}
          </Text>
        </Touchable>
      </Touchable>
    )
  )
}

export default Card
