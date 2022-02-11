import React, { useCallback, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Text from 'ui/Text'
import Touchable from 'ui/Touchable'
import Animated, { useAnimatedReaction, runOnJS } from 'react-native-reanimated'
import { useNavigation, SCREENS, NAVIGATION } from 'navigation'
import { useReactiveVar, store } from 'gql'
import { useTranslation } from 'react-i18next'
import cropImage from 'utils/cropImage'
import trimVideo from 'utils/trimVideo'
import { HEADER_HEIGHT } from '../constants'
import { arrowDown } from 'images'
import { logError } from 'utils/sentry'
import { FILE_TYPES } from 'utils/enums'

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

function Header({
  headerLeftStyle = {},
  headerRightStyle = {},
  arrowStyle = {},
  toggleAlbum,
  albumVisible,
}) {
  const { t } = useTranslation('add-media')
  const [isCropping, setCropping] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { dismissModal, navigate } = useNavigation()

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)
  const albumTitle = useReactiveVar(store.files.albumTitleVar)

  useAnimatedReaction(
    () => albumVisible.value,
    (result, previous) => {
      if (result !== previous) {
        runOnJS(setDisabled)(result)
      }
    }
  )

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

      const files = await Promise.all(
        filesWithOptions.map(async (file) => {
          if (file.mediaType === 'video') {
            const { uri, poster } = await trimVideo(file)

            return {
              uri,
              poster,
              type: FILE_TYPES.VIDEO,
            }
          }

          if (file.mediaType === 'photo') {
            return {
              uri: await cropImage(file),
              type: FILE_TYPES.IMAGE,
            }
          }
        })
      )

      store.files.add(files)

      navigate(SCREENS.ADD_POST, {
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      })
    } catch (err) {
      logError(err)
    }

    setCropping(false)
  }, [navigate])

  const albumWithFallback = selectedAlbum?.title || albumTitle

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Animated.View style={[styles.left, headerLeftStyle]}>
          <Touchable onPress={handleOnCancel} disabled={disabled}>
            <Text medium color="white">
              {t('options.cancel')}
            </Text>
          </Touchable>
        </Animated.View>

        <View style={styles.center}>
          {albumWithFallback && (
            <Touchable onPress={toggleAlbum} style={styles.title}>
              <Text medium color="white">
                {albumWithFallback}
              </Text>
              <Animated.Image source={arrowDown} style={[styles.arrow, arrowStyle]} />
            </Touchable>
          )}
        </View>

        <Animated.View style={[styles.right, headerRightStyle]}>
          <Touchable onPress={handleCropping} disabled={!selectedFiles.length} disabled={disabled}>
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
          </Touchable>
        </Animated.View>
      </View>
    </View>
  )
}

export default Header
