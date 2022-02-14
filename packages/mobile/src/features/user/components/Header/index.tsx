import React from 'react'
import { View } from 'react-native'
import { Avatar, Title, Text, ParsedText } from 'ui'

const styles = {
  base: {
    paddingBottom: 45,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingRight: 10,
  },
  info: {
    paddingTop: 20,
  },
}

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
    <View
      spacingHorizontal={spacingHorizontal}
      style={[
        styles.base,
        {
          paddingLeft: spacingHorizontal ? 20 : 0,
          paddingRight: spacingHorizontal ? 20 : 0,
        },
      ]}
    >
      <View style={styles.inner}>
        <View style={styles.username}>
          <Title medium numberOfLines={0}>
            {firstName}
          </Title>
          <Title medium>{lastName}</Title>
        </View>
        <Avatar size={80} uri={avatarUrl} disabled />
      </View>

      {location || bio || website ? (
        <View style={styles.info}>
          {location && (
            <Text color="neutral" fontSize={15}>
              {location}
            </Text>
          )}

          {bio && (
            <ParsedText fontSize={15} style={{ marginTop: 5 }} lineHeight={22}>
              {bio}
            </ParsedText>
          )}

          {website && (
            <ParsedText fontSize={15} style={{ marginTop: 5 }}>
              {website}
            </ParsedText>
          )}
        </View>
      ) : null}
    </View>
  )
}

export default Header
