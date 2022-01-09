import React, { useCallback, useState } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from 'ui/Text'
import Animated from 'react-native-reanimated'
import { useNavigation, SCREENS, NAVIGATION } from 'navigation'
import { useReactiveVar, store } from 'gql'
import { useTranslation } from 'react-i18next'
import cropImage from 'utils/cropImage'
import { HEADER_HEIGHT } from '../constants'
import { arrowDown } from 'images'
import { logError } from 'utils/sentry'

const styles = {
  background: {
    backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: NAVIGATION.STATUS_BAR_HEIGHT,
    paddingBottom: 20,
    zIndex: 10,
    paddingHorizontal: 20,
    height: HEADER_HEIGHT,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    tintColor: 'white',
    marginLeft: 5,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
}

function Header({ headerLeftStyle = {}, headerRightStyle = {}, arrowStyle = {}, toggleAlbum }) {
  const { t } = useTranslation('add-media')
  const [isCropping, setCropping] = useState(false)

  const { dismissModal, navigate } = useNavigation()

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)
  const albumTitle = useReactiveVar(store.files.albumTitleVar)

  const handleOnCancel = useCallback(() => {
    store.files.reset()
    dismissModal()
  }, [])

  const handleCropping = useCallback(async () => {
    try {
      setCropping(true)

      const options = store.files.croppedOptionsVar()
      const filesWithOptions = selectedFiles.map((file) => ({
        ...file,
        crop: options[file.id],
      }))

      const files = await Promise.all(filesWithOptions.map(cropImage))

      store.files.add(files)
    } catch (err) {
      logError(err)
    }

    navigate(SCREENS.ADD_POST, {
      options: {
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    })

    setCropping(false)
  }, [navigate])

  const albumWithFallback = selectedAlbum?.title || albumTitle

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Animated.View style={[styles.left, headerLeftStyle]}>
          <TouchableOpacity onPress={handleOnCancel}>
            <Text medium color="white">
              {t('options.cancel')}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.center}>
          {albumWithFallback && (
            <TouchableOpacity onPress={toggleAlbum} style={styles.title}>
              <Text medium color="white">
                {albumWithFallback}
              </Text>
              <Animated.Image source={arrowDown} style={[styles.arrow, arrowStyle]} />
            </TouchableOpacity>
          )}
        </View>

        <Animated.View style={[styles.right, headerRightStyle]}>
          <TouchableOpacity onPress={handleCropping} disabled={!selectedFiles.length}>
            {isCropping ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                medium
                color="white"
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
  )
}

export default Header
