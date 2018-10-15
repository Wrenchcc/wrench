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
      addSelectedFiles,
      changeProject,
      closeSelectProject,
      onCropping,
      onTakePicture,
      state,
      toggleSelectProject,
    }) => {
      const selectedImage = state.selectedFiles[state.selectedIndex]

      return (
        <Base>
          <AddPostHeader
            changeProject={changeProject}
            closeSelectProject={closeSelectProject}
            selectedProjectIndex={state.selectedProjectIndex}
            selectProjectOpen={state.selectProjectOpen}
            showNavigateToPost={!!selectedImage}
            toggleSelectProject={toggleSelectProject}
          />

          <Placeholder>
            {selectedImage ? (
              <ImageEditor image={selectedImage} onCropping={onCropping} />
            ) : (
              <Camera onTakePicture={onTakePicture} />
            )}
          </Placeholder>

          <MediaPicker
            onSelect={addSelectedFiles}
            selectedFiles={state.selectedFiles}
            selectedIndex={state.selectedIndex}
          />
        </Base>
      )
    }}
  </Subscribe>
)

export default AddMedia
