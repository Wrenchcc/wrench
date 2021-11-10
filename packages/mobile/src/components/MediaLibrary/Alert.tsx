import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

function Alert({ onCancel, onDiscard }) {
  const { t } = useTranslation('alert')

  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 150,
    })

    return () => handleCancel()
  }, [])

  const handleCancel = () => {
    opacity.value = withTiming(
      0,
      {
        duration: 150,
      },
      () => {
        runOnJS(onCancel)()
      }
    )
  }

  const handleDiscard = () => {
    opacity.value = withTiming(
      0,
      {
        duration: 150,
      },
      () => {
        runOnJS(onDiscard)()
      }
    )
  }

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000000,
          backgroundColor: 'rgba(000, 000, 000, .3)',
        },
      ]}
    >
      <Animated.View
        style={[
          {
            width: '70%',
            backgroundColor: '#222',
            borderRadius: 15,
          },
          opacityStyle,
        ]}
      >
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            {/* Discard photo? */}
            {t('discardPhoto')}
          </Text>

          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}
          >
            {/* If you close the camera now, your photo will be discarded. */}
            {t('discardPhotoDescription')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleDiscard}
          activeOpacity={0.7}
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#343434',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
        >
          <Text style={{ color: '#ED4956', fontWeight: '600', fontSize: 15 }}>Discard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          activeOpacity={0.7}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
        >
          <Text style={{ color: 'white', fontSize: 15 }}>Keep</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default Alert
