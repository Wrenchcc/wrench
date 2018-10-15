import React from 'react'
import { Subscribe } from 'unstated'
import { AddPostContainer } from 'state'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'
import { Base, Placeholder } from './styles'

const AddMedia = () => (
  <Subscribe to={[AddPostContainer]}>
    {({
      state,
      toggleSelectProject,
      changeProject,
      addSelectedFiles,
      onTakePicture,
      onCropping,
    }) => {
      const selectedImage = state.selectedFiles[state.selectedIndex]

      return (
        <Base>
          <AddPostHeader
            canGoToCaption={!!selectedImage}
            changeProject={changeProject}
            selectedProjectIndex={state.selectedProjectIndex}
            toggleSelectProject={toggleSelectProject}
            selectProjectOpen={state.selectProjectOpen}
          />

          <Placeholder>
            {selectedImage ? (
              <ImageEditor image={selectedImage} onCropping={onCropping} />
            ) : (
              <Camera onTakePicture={onTakePicture} />
            )}
          </Placeholder>

          <MediaPicker
            selectedFiles={state.selectedFiles}
            selectedIndex={state.selectedIndex}
            onSelect={addSelectedFiles}
          />
        </Base>
      )
    }}
  </Subscribe>
)

export default AddMedia
