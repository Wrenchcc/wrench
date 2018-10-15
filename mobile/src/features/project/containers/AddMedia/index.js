import React from 'react'
import PropTypes from 'prop-types'
import { Subscribe } from 'unstated'
import { compose } from 'react-apollo'
import { PostContainer } from 'state'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import Camera from 'features/project/components/Camera'
import AddMediaHeader from 'features/project/components/AddMediaHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'
import { Base, Placeholder } from './styles'

const AddMedia = ({ projects }) => (
  <Subscribe to={[PostContainer]}>
    {({ state, toggleDropdown, changeProject, addSelectedFiles, onTakePicture, onCropping }) => {
      const editImage = state.selectedFiles[state.selectedIndex]

      return (
        <Base>
          <AddMediaHeader
            canGoToCaption={!!editImage}
            changeProject={changeProject}
            projects={projects}
            selectedProject={state.selectedProject || projects[0]}
            toggleDropdown={toggleDropdown}
            dropdownOpen={state.dropdownOpen}
          />

          <Placeholder>
            {editImage ? (
              <ImageEditor image={editImage} onCropping={onCropping} />
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

AddMedia.propTypes = {
  projects: PropTypes.array.isRequired,
}

export default compose(getCurrentUserProjects)(AddMedia)
