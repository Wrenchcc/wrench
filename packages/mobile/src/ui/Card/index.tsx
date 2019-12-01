import React, { useCallback } from 'react'
import Touchable from 'ui/Touchable'
import { useNavigation, SCREENS } from 'navigation'
import { Picture, ProjectName, Username, SIZE } from './styles'

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
      <Picture source={image} width={size} height={size} />
      <ProjectName numberOfLines={1} width={size}>
        {title}
      </ProjectName>
      <Touchable onPress={handleNavigation}>
        <Username fontSize={15} color="grey" numberOfLines={1} width={size}>
          {user.fullName}
        </Username>
      </Touchable>
    </Touchable>
  )
}

export default Card
