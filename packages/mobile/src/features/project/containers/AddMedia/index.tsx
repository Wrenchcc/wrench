import React, { Fragment, useRef } from 'react'
import { usePostStore } from 'store'
import Camera from '../../components/Camera'
import AddPostHeader from '../../components/AddPostHeader'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'

function AddMedia() {
  const { onSelect, editFile } = usePostStore(store => store.actions)
  const file = false

  return (
    <Fragment>
      {file ? (
        <ImageEditor image={file} onEditImage={editFile} uri={file.uri} />
      ) : (
        <Camera onTakePicture={onSelect} />
      )}

      <MediaPicker />
    </Fragment>
  )
}

export default AddMedia
