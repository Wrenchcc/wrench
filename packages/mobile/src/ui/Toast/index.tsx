import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import PlatformColor from 'ui/PlatformColor'
import { TOAST_TYPES } from 'utils/enums'

function mapTypeToColor(type: TOAST_TYPES) {
  switch (type) {
    case TOAST_TYPES.WARNING:
      return PlatformColor.warning
    case TOAST_TYPES.SPAM:
    case TOAST_TYPES.ERROR:
      return PlatformColor.error
    case TOAST_TYPES.SUCCESS:
      return PlatformColor.success
    default:
      return PlatformColor.accent
  }
}

const styles = {
  base: {
    justifyContent: 'center',
    opacity: 0.98,
    paddingHorizontal: 14,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
}

function Toast({ content, type }: { content: string; type?: TOAST_TYPES }) {
  const { t } = useTranslation('toast')

  const renderContent = useCallback(() => {
    switch (type) {
      case TOAST_TYPES.NETWORK:
        return t('network')
      case TOAST_TYPES.SPAM:
        return t('spam')
      default:
        return content
    }
  }, [t, type, content])

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: mapTypeToColor(type),
        },
      ]}
    >
      <Text color="white" medium center fontSize={15}>
        {content || renderContent()}
      </Text>
    </View>
  )
}

export default Toast
