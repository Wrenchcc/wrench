import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon, ActionSheet, Touchable } from 'ui'
import cropImage from 'utils/cropImage'
import { close } from 'images'
import { logError } from 'utils/sentry'
import Camera from 'components/Camera'
import ImageEditor from 'components/ImageEditor'
import MediaPicker from 'components/MediaPicker'
import SelectProject from '../../components/SelectProject'
import { Base } from './styles'

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
    addFiles: store.actions.addFiles,
    hasSelectedFiles: store.selectedFiles.length > 0,
    onEdit: store.actions.onEdit,
    onSelect: store.actions.onSelect,
    reset: store.actions.reset,
    selectedFile: store.selectedFiles.find(({ id }) => id === store.selectedId),
    selectedFiles: store.selectedFiles,
  }))

  const handleCropping = useCallback(async () => {
    setLoading(true)

    try {
      const files = await Promise.all(selectedFiles.map(cropImage))

      addFiles(files)
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

  const renderComponent = useCallback(() => {
    return selectedFile ? (
      <ImageEditor source={selectedFile} onChange={onEdit} />
    ) : (
      <Camera onTakePicture={onSelect} />
    )
  }, [selectedFile])

  return (
    <Base>
      <Header
        headerLeft={<Icon source={close} onPress={handleDismissModal} nativeHandler />}
        headerRight={
          isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : hasSelectedFiles ? (
            <Touchable onPress={handleCropping} nativeHandler>
              <Text color="white" medium>
                {t('AddMedia:next')}
              </Text>
            </Touchable>
          ) : null
        }
        color="black"
      />

      <SelectProject />

      <MediaPicker ListHeaderComponent={renderComponent} />

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
