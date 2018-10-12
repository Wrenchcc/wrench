import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import Camera from '../../components/Camera'
import AddPostHeader from '../../components/AddPostHeader'
import ImageEditor from '../../components/ImageEditor'
import MediaPicker from '../../components/MediaPicker'

import { Base, Placeholder } from './styles'

class AddPost extends PureComponent {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      capturedImage: null,
      dropdownOpen: false,
      isEditing: false,
      selectedFiles: [],
      selectedIndex: null,
      selectedProject: pathOr(null, ['projects', 0, 'node'], props),
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      ...(prevState.isEditing && { capturedImage: null }),
    }))
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

  onTakePicture = capturedImage => {
    this.toggleEdit()
    this.setState({ capturedImage })
  }

  render() {
    const { projects } = this.props
    const {
      capturedImage,
      dropdownOpen,
      selectedFiles,
      selectedIndex,
      selectedProject,
    } = this.state

    const editImage = capturedImage || selectedFiles[selectedIndex]

    let component

    if (editImage) {
      component = (
        <ImageEditor image={editImage} onCropping={({ x, y, index }) => console.log(x, y, index)} />
      )
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

        <MediaPicker selectedFiles={selectedFiles} onSelect={this.addSelectedFiles} />
      </Base>
    )
  }
}

export default compose(getCurrentUserProjects)(AddPost)
