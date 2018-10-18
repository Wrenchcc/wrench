import React from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
import { Text, Followers } from 'ui'
import { check } from 'images'
import { Base, Cover, Middle, Content, Icon } from './styles'

const Project = ({ id, images, title, followers, onPress, selected }) => {
  const image = pathOr(null, ['edges', 0, 'node'], images)

  return (
    <Base key={id} onPress={() => onPress(id)}>
      <Cover source={image} />

      <Middle>
        <Content>
          <Text numberOfLines={1}>{title}</Text>
          <Followers color="grey" followers={followers.totalCount} />
        </Content>
        {selected && <Icon source={check} />}
      </Middle>
    </Base>
  )
}

Project.propTypes = {
  followers: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  images: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default Project
