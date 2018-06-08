import React from 'react'
import PropTypes from 'prop-types'
import { Text, Followers } from 'ui'
import { check } from 'images'
import { Base, Cover, Middle, Content, Icon } from './styles'

const Project = ({ id, coverUri, name, followers, onPress, selected }) => (
  <Base key={id} onPress={() => onPress({ id, name })}>
    <Cover source={{ uri: coverUri }} />
    <Middle>
      <Content>
        <Text numberOfLines={1}>{name}</Text>
        <Followers color="grey" followers={followers} />
      </Content>
      {selected && <Icon source={check} />}
    </Middle>
  </Base>
)

Project.propTypes = {
  id: PropTypes.string.isRequired,
  coverUri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default Project
