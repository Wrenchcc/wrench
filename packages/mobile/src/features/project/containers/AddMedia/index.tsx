import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon, ActionSheet } from 'ui'
import cropImage from 'utils/cropImage'
import { close } from 'images'
import Camera from '../../components/Camera'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'
import SelectProject from '../../components/SelectProject'
import { Base, Placeholder } from './styles'

function AddMedia() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const toggleActionSheet = useCallback(() => setIsOpen(!isOpen), [isOpen])

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

    const files = await Promise.all(selectedFiles.map(cropImage))

    setLoading(false)

    addFiles(files)

    // Crop on press
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

  return (
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

      <MediaPicker />

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
  )
}

export default AddMedia
