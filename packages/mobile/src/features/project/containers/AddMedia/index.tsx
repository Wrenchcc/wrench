import React, { useRef } from 'react'
import { usePostStore } from 'store'
import Camera from '../../components/Camera'
import AddPostHeader from '../../components/AddPostHeader'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'
import { Placeholder } from './styles'

function AddMedia() {
  const { onSelect, onEdit, file } = usePostStore(store => ({
    onSelect: store.actions.onSelect,
    onEdit: store.actions.onEdit,
    file: store.files.find(file => file.id === store.id),
  }))

  return (
    <>
      <Placeholder>
        {file ? (
          <ImageEditor image={file} onEdit={onEdit} uri={file.uri} />
        ) : (
          <Camera onTakePicture={onSelect} />
        )}
      </Placeholder>

      <MediaPicker />
    </>
  )
}

export default AddMedia
