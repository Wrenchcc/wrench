import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'ui'
import { navigateToFollowers } from 'navigation'
import { Base, ProjectName, Followers } from './styles'

const Header = ({ name, followers }) => (
  <Base>
    <ProjectName>
      <Title large>{name}</Title>
      <Followers followers={followers} onPress={() => navigateToFollowers()} />
    </ProjectName>
  </Base>
)

Header.propTypes = {
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
}

export default Header
