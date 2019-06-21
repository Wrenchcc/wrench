import React, { useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon } from 'ui'
import { close } from 'images'
import Camera from '../../components/Camera'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'
import { Placeholder } from './styles'

function AddMedia() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()

  const { onSelect, onEdit, file, hasFiles } = usePostStore(store => ({
    file: store.files.find(f => f.id === store.id),
    hasFiles: store.files.length > 0,
    onEdit: store.actions.onEdit,
    onSelect: store.actions.onSelect,
  }))

  const handleNaivgation = useCallback(() => {
    navigate(SCREENS.ADD_POST)
  }, [])

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [])

  return (
    <>
      <Header
        headerLeft={<Icon source={close} onPress={handleDismissModal} />}
        headerRight={
          hasFiles && (
            <Text color="white" onPress={handleNaivgation} medium>
              {t('AddMedia:next')}
            </Text>
          )
        }
        color="black"
      />
      <Placeholder>
        {file ? <ImageEditor file={file} onEdit={onEdit} /> : <Camera onTakePicture={onSelect} />}
      </Placeholder>

      <MediaPicker />
    </>
  )
}

export default AddMedia
