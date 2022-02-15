import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
}

function Follow({ onPress, following, small, style = {} }) {
  const { t } = useTranslation('follow')

  return (
    <Touchable
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: !following ? PlatformColor.inverse : PlatformColor.default,
          borderWidth: small ? 0 : 1,
          borderColor: !following ? PlatformColor.inverse : PlatformColor.divider,
        },
        style,
      ]}
    >
      <Text color={following ? 'inverse' : 'default'} medium fontSize={15}>
        {following
          ? small
            ? t('unfollowSmall')
            : t('unfollow')
          : small
          ? t('followSmall')
          : t('follow')}
      </Text>
    </Touchable>
  )
}

export default Follow
