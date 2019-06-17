import React from 'react'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'
import { Base, Placeholder } from './styles'

function AddMedia() {
  return (
    <Base>
      {/*<AddPostHeader
            changeProject={changeProject}
            closeSelectProject={closeSelectProject}
            hasSelectedFiles={!!selectedFile}
            resetState={resetState}
            selectedProjectId={state.selectedProjectId}
            selectProjectOpen={state.selectProjectOpen}
            toggleSelectProject={toggleSelectProject}
          />*/}

      <Placeholder>
        {selectedFile ? (
          <ImageEditor image={selectedFile} onEditImage={onEditImage} uri={selectedFile.uri} />
        ) : (
          <Camera onTakePicture={onTakePicture} />
        )}
      </Placeholder>

      <MediaPicker
        onSelect={addSelectedFiles}
        selectedFiles={state.selectedFiles}
        selectedIndex={state.selectedIndex}
        cameraFile={state.cameraFile}
      />
    </Base>
  )
}

export default AddMedia
