import React from 'react'
import { Avatar, Title, Text } from 'ui'
import { Base, Inner, Username, Info } from './styles'

function Header({
  firstName,
  lastName,
  avatarUrl = '',
  spacingHorizontal = false,
  location,
  website,
  bio,
}) {
  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Inner>
        <Username>
          <Title medium numberOfLines={0}>
            {firstName}
          </Title>
          <Title medium>{lastName}</Title>
        </Username>
        <Avatar size={80} uri={avatarUrl} disabled />
      </Inner>

      {location || bio || website ? (
        <Info>
          {location && (
            <Text color="grey" fontSize={15}>
              {location}
            </Text>
          )}

          {bio && (
            <Text fontSize={15} style={{ marginTop: 5 }}>
              {bio}
            </Text>
          )}

          {website && (
            <Text fontSize={15} style={{ marginTop: 5 }}>
              {website}
            </Text>
          )}
        </Info>
      ) : null}
    </Base>
  )
}

export default Header
