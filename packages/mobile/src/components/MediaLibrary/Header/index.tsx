import React, { useCallback, useState } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from 'ui/Text'
import Animated from 'react-native-reanimated'
import { useNavigation, SCREENS } from 'navigation'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import { useTranslation } from 'react-i18next'
import cropImage from 'utils/cropImage'
import { HEADER_HEIGHT } from '../constants'
import { arrowDown } from 'images'

function Header({
  headerTitle,
  headerLeftStyle = {},
  headerRightStyle = {},
  arrowStyle = {},
  toggleAlbum,
}) {
  const { t } = useTranslation('library')
  const [isCropping, setCropping] = useState(false)

  const { dismissModal, navigate } = useNavigation()

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)

  const handleOnCancel = useCallback(() => {
    store.files.reset()
    dismissModal()
  }, [])

  const handleCropping = useCallback(async () => {
    try {
      setCropping(true)
      const files = await Promise.all(selectedFiles.map(cropImage))
      store.files.add(files)
    } catch (err) {
      // logError(err)
    }

    navigate(SCREENS.ADD_POST)

    setCropping(false)
  }, [navigate])

  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'black',
          height: HEADER_HEIGHT,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <Animated.View style={[{ flex: 1, alignItems: 'flex-start' }, headerLeftStyle]}>
            <TouchableOpacity onPress={handleOnCancel}>
              <Text medium>{t('cancel')}</Text>
            </TouchableOpacity>
          </Animated.View>

          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}
          >
            {headerTitle ? (
              <Text medium>{headerTitle}</Text>
            ) : (
              selectedAlbum && (
                <TouchableOpacity
                  onPress={toggleAlbum}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text medium>{selectedAlbum?.title}</Text>
                  <Animated.Image
                    source={arrowDown}
                    style={[{ tintColor: 'white', marginLeft: 5 }, arrowStyle]}
                  />
                </TouchableOpacity>
              )
            )}
          </View>

          <Animated.View style={[{ flex: 1, alignItems: 'flex-end' }, headerRightStyle]}>
            <TouchableOpacity onPress={handleCropping} disabled={!selectedFiles.length}>
              {isCropping ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  medium
                  style={{
                    opacity: !selectedFiles.length ? 0.5 : 1,
                  }}
                >
                  {t('next')}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  )
}

export default Header
