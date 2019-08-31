import React, { useCallback, useState, useRef, useEffect } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useTranslation } from 'react-i18next'
import BottomSheet from 'reanimated-bottom-sheet'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon, ActionSheet } from 'ui'
import cropImage from 'utils/cropImage'
import { close } from 'images'
import { isAndroid, hasNotch } from 'utils/platform'
import { SELECTED_ALBUM_KEY } from 'utils/storage/constants'
import { logError } from 'utils/sentry'
import Camera from '../../components/Camera'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'
import SelectProject from '../../components/SelectProject'
import Albums from '../../components/MediaPicker/Albums'
import { Base, Placeholder } from './styles'

const { height } = Dimensions.get('window')

const BOTTOM_SHEET_HEIGHT = height - (isAndroid ? 24 : hasNotch ? 44 : 20) // TODO: fix status bar constant from navigation

function AddMedia() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [loadAlbums, setLoadAlbums] = useState(false)
  const [selectedAlbum, setAlbum] = useState()

  const toggleActionSheet = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const bottomSheet = useRef()

  const {
    onSelect,
    onEdit,
    selectedFile,
    hasSelectedFiles,
    selectedFiles,
    addFiles,
    reset,
  } = usePostStore(store => ({
    selectedFile: store.selectedFiles.find(({ id }) => id === store.selectedId),
    hasSelectedFiles: store.selectedFiles.length > 0,
    selectedFiles: store.selectedFiles,
    onEdit: store.actions.onEdit,
    addFiles: store.actions.addFiles,
    onSelect: store.actions.onSelect,
    reset: store.actions.reset,
  }))

  const handleCropping = useCallback(async () => {
    setLoading(true)

    try {
      const files = await Promise.all(selectedFiles.map(cropImage))
      addFiles(files)
      // TODO: Show error banner
    } catch (err) {
      logError(err)
    }

    setLoading(false)

    navigate(SCREENS.ADD_POST, {
      options: {
        animations: {
          push: {
            waitForRender: true,
          },
        },
      },
    })
  }, [selectedFile, navigate, addFiles])

  const handleDismissModal = useCallback(() => {
    if (hasSelectedFiles) {
      toggleActionSheet()
    } else {
      dismissModal()
    }
  }, [hasSelectedFiles, toggleActionSheet, dismissModal])

  const handleDiscard = useCallback(() => {
    dismissModal()
    // TODO: Why do reset open modal again? isOpen = true
    setTimeout(() => {
      reset()
    }, 0)
  }, [reset, dismissModal])

  const loadSavedAlbum = useCallback(async () => {
    const album = await AsyncStorage.getItem(SELECTED_ALBUM_KEY)

    if (album) {
      setAlbum(JSON.parse(album))
    }
  }, [setAlbum])

  useEffect(() => {
    loadSavedAlbum()
  }, [])

  const openAlbums = useCallback(() => {
    setLoadAlbums(true)
    bottomSheet.current.snapTo(1)
  }, [setLoadAlbums, bottomSheet])

  const changeAlbum = useCallback(
    album => {
      setAlbum(album)
      bottomSheet.current.snapTo(0)
      AsyncStorage.setItem(SELECTED_ALBUM_KEY, JSON.stringify(album))
    },
    [setAlbum, bottomSheet]
  )

  const renderAlbums = useCallback(() => loadAlbums && <Albums onPress={changeAlbum} />, [
    changeAlbum,
    loadAlbums,
  ])

  return (
    <>
      <Base>
        <Header
          headerLeft={<Icon source={close} onPress={handleDismissModal} />}
          headerRight={
            isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : hasSelectedFiles ? (
              <Text color="white" onPress={handleCropping} medium>
                {t('AddMedia:next')}
              </Text>
            ) : null
          }
          color="black"
        />

        <SelectProject />

        <Placeholder>
          {selectedFile ? (
            <ImageEditor source={selectedFile} onChange={onEdit} />
          ) : (
            <Camera onTakePicture={onSelect} />
          )}
        </Placeholder>

        <MediaPicker openAlbums={openAlbums} selectedAlbum={selectedAlbum} setAlbum={setAlbum} />

        <ActionSheet
          title={t('AddMedia:options:title')}
          isOpen={isOpen}
          onClose={toggleActionSheet}
          destructiveButtonIndex={0}
          options={[
            {
              name: t('AddMedia:options:discard'),
              onSelect: handleDiscard,
            },
            { name: t('AddMedia:options:cancel') },
          ]}
        />
      </Base>

      <BottomSheet
        ref={bottomSheet}
        initialSnap={0}
        snapPoints={[0, BOTTOM_SHEET_HEIGHT]}
        renderContent={renderAlbums}
      />
    </>
  )
}

export default AddMedia
