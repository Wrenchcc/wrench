import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll } from 'react-native'
import { compose } from 'react-apollo'
import { updatePostData } from 'graphql/mutations/post/updatePostData'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { getPostData } from 'graphql/queries/post/getPostData'
import Camera from 'features/project/components/Camera'
import AddMediaHeader from 'features/project/components/AddMediaHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'
import { Base, Placeholder } from './styles'

class AddMedia extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    postData: PropTypes.object,
    updatePostData: PropTypes.func.isRequired,
  }

  toggleDropdown = () => {}

  changeProject = selectedProject => {
    this.props.updatePostData({ selectedProject })
  }

  addSelectedFiles = (selectedFiles, selectedIndex) => {
    this.props.updatePostData({ selectedFiles, selectedIndex })
  }

  onCropping = crop => {
    const { selectedFiles, selectedIndex } = this.props.postData

    selectedFiles[selectedIndex] = {
      ...selectedFiles[selectedIndex],
      crop,
    }

    this.props.updatePostData({ selectedFiles, selectedIndex: 0 })
  }

  onTakePicture = async file => {
    const savedFile = await CameraRoll.saveToCameraRoll(file.uri)
    this.props.updatePostData({
      selectedFiles: [{ ...file, uri: savedFile, new_camera_file: true }],
      selectedIndex: 0,
    })
  }

  render() {
    const { projects, postData } = this.props
    const { selectedFiles, selectedProject, selectedIndex, dropdownOpen } = postData

    const editImage = selectedFiles[selectedIndex]

    let component

    if (editImage) {
      component = <ImageEditor image={editImage} onCropping={this.onCropping} />
    } else {
      component = <Camera onTakePicture={this.onTakePicture} />
    }

    return (
      <Base>
        <AddMediaHeader
          canGoToCaption={!!editImage}
          changeProject={this.changeProject}
          projects={projects}
          selectedProject={selectedProject}
          toggleDropdown={this.toggleDropdown}
          dropdownOpen={dropdownOpen}
        />

        <Placeholder>{component}</Placeholder>

        <MediaPicker
          selectedFiles={selectedFiles}
          selectedIndex={selectedIndex}
          onSelect={this.addSelectedFiles}
        />
      </Base>
    )
  }
}

export default compose(
  updatePostData,
  getPostData,
  getCurrentUserProjects
)(AddMedia)
