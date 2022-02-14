import React from 'react'
import PlatformColor from 'ui/PlatformColor'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'

const styles = {
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
}

function Button({ children, color, small, ...props }) {
  return (
    <Touchable
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: PlatformColor[color] || PlatformColor.default,
          height: small ? 30 : 60,
        },
      ]}
    >
      <Text medium fontSize={16} color="default">
        {children}
      </Text>
    </Touchable>
  )
}

export default Button
