import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon, ActionSheet } from 'ui'
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
  const toggleActionSheet = useCallback(() => setIsOpen(!isOpen), [isOpen])

  const { onSelect, onEdit, selectedFile, hasSelectedFiles, reset } = usePostStore(store => ({
    selectedFile: store.selectedFiles.find(({ id }) => id === store.selectedId),
    hasSelectedFiles: store.selectedFiles.length > 0,
    onEdit: store.actions.onEdit,
    onSelect: store.actions.onSelect,
    reset: store.actions.reset,
  }))

  const handleNavigation = useCallback(() => {
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
  }, [])

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
          hasSelectedFiles && (
            <Text color="white" onPress={handleNavigation} medium>
              {t('AddMedia:next')}
            </Text>
          )
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
