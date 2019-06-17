import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'
import { Base, Placeholder } from './styles'

function AddMedia() {
  const { selected, files } = useStoreState(state => state.post)
  const { addFile, editFile, selectFile } = useStoreActions(actions => actions.post)

  return (
    <Base>
      {/*<AddPostHeader
            changeProject={changeProject}
            closeSelectProject={closeSelectProject}
            hasSelectedFiles={!!selected}
            resetState={resetState}
            selectedProjectId={state.selectedProjectId}
            selectProjectOpen={state.selectProjectOpen}
            toggleSelectProject={toggleSelectProject}
          />*/}

      <Placeholder>
        {selected ? (
          <ImageEditor image={selected} onEditImage={editFile} uri={selected.uri} />
        ) : (
          <Camera onTakePicture={addFile} />
        )}
      </Placeholder>

      <MediaPicker onSelect={selectFile} files={files} selectedIndex={0} cameraFile={null} />
    </Base>
  )
}

export default AddMedia
