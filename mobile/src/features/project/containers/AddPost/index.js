import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll } from 'react-native'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'

import { Base, Placeholder } from './styles'

class AddPost extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      selectedFiles: [],
      selectedIndex: null,
      selectedProject: pathOr(null, ['projects', 0, 'node'], props),
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }))
  }

  changeProject = selectedProject => {
    this.toggleDropdown()
    this.setState({ selectedProject })
  }

  addSelectedFiles = (selectedFiles, selectedIndex) => {
    this.setState({ selectedFiles, selectedIndex })
  }

  onCropping = crop => {
    // this.setState(({ selectedFiles, selectedIndex }) => {
    //   selectedFiles[selectedIndex] = {
    //     ...selectedFiles[selectedIndex],
    //     crop,
    //   }
    //   return { selectedFiles }
    // })
  }

  onTakePicture = async file => {
    const savedFile = await CameraRoll.saveToCameraRoll(file.uri)
    this.setState({
      selectedFiles: [{ ...file, uri: savedFile, new_camera_file: true }],
      selectedIndex: 0,
    })
  }

  render() {
    const { projects } = this.props
    const { dropdownOpen, selectedFiles, selectedIndex, selectedProject } = this.state

    const editImage = selectedFiles[selectedIndex]

    let component

    if (editImage) {
      component = <ImageEditor image={editImage} onCropping={this.onCropping} />
    } else {
      component = <Camera onTakePicture={this.onTakePicture} />
    }

    return (
      <Base>
        <AddPostHeader
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

export default compose(getCurrentUserProjects)(AddPost)
