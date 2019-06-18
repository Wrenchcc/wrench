import React, { Fragment, useRef } from 'react'
import { useStore } from 'store'
import Camera from '../../components/Camera'
import AddPostHeader from '../../components/AddPostHeader'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'

function AddMedia() {
  const { selectFile, editFile } = useStore(store => ({
    editFile: store.actions.editFile,
    selectFile: store.actions.selectFile,
  }))

  const file = false

  return (
    <Fragment>
      {file ? (
        <ImageEditor image={file} onEditImage={editFile} uri={file.uri} />
      ) : (
        <Camera onTakePicture={selectFile} />
      )}

      <MediaPicker />
    </Fragment>
  )
}

export default AddMedia
