import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { ActivityIndicator, Header, Text, Icon, Touchable } from 'ui'
import cropImage from 'utils/cropImage'
import { useDynamicColor } from 'utils/hooks'
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
  const [isLoading, setLoading] = useState(false)
  const { showActionSheetWithOptions } = useActionSheet()
  const dynamicColor = useDynamicColor('inverse')

  const {
    onSelect,
    onEdit,
    selectedFile,
    hasSelectedFiles,
    selectedFiles,
    addFiles,
    reset,
  } = usePostStore((store) => ({
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
    navigate(SCREENS.ADD_POST)
  }, [selectedFile, navigate, addFiles])

  const handleDismissModal = useCallback(() => {
    if (hasSelectedFiles) {
      showActionSheetWithOptions(
        {
          title: t('AddMedia:options:title'),
          options: [t('AddMedia:options:discard'), t('AddMedia:options:cancel')],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
          tintColor: dynamicColor,
        },
        (index) => {
          if (index === 0) {
            dismissModal()
            reset()
          }
        }
      )
    } else {
      dismissModal()
    }
  }, [hasSelectedFiles, showActionSheetWithOptions, dismissModal, reset])

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
        headerLeft={<Icon source={close} onPress={handleDismissModal} color="white" />}
        headerRight={
          isLoading ? (
            <ActivityIndicator color="white" />
          ) : hasSelectedFiles ? (
            <Touchable onPress={handleCropping}>
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
    </Base>
  )
}

export default AddMedia
