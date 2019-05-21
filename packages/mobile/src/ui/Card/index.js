import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Touchable from 'ui/Touchable'
import Text from 'ui/Text'
import { navigateToUser } from 'navigation/actions'
import { Picture, ProjectName, SIZE } from './styles'

const Card = memo(function Card({ image, title, onPress, style = {}, user }) {
  return (
    image && (
      <Touchable onPress={onPress} style={style}>
        <Picture source={image} width={SIZE} height={SIZE} />
        <ProjectName numberOfLines={1}>{title}</ProjectName>
        <Touchable onPress={() => navigateToUser({ user })}>
          <Text fontSize={15} color="grey">
            {user.fullName}
          </Text>
        </Touchable>
      </Touchable>
    )
  )
})

Card.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  user: PropTypes.object.isRequired,
}

export default Card
