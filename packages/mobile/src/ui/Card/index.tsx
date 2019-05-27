import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import { useNavigation, SCREENS } from 'navigation'
import { Picture, ProjectName, SIZE } from './styles'

function Card({ image, title, onPress, style = {}, user }) {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(
    () => navigate(SCREENS.USER, {
      username: user.username,
    }),
    []
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

Card.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  user: PropTypes.object.isRequired,
}

export default Card
