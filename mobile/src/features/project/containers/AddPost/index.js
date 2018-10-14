import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import ImageEditor from 'features/project/components/ImageEditor'
import MediaPicker from 'features/project/components/MediaPicker'

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

  onCropping = data => {
    this.setState(({ selectedFiles, selectedIndex }) => {
      selectedFiles[selectedIndex] = {
        ...selectedFiles[selectedIndex],
        crop: data,
      }
      return { selectedFiles }
    })
  }

  onTakePicture = capturedImage => {
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

    const currentImage = capturedImage || selectedFiles[selectedIndex]

    let component

    if (currentImage) {
      component = <ImageEditor image={currentImage} onCropping={this.onCropping} />
    } else {
      component = <Camera onTakePicture={this.onTakePicture} />
    }

    return (
      <Base>
        <AddPostHeader
          canGoToCaption={!!currentImage}
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
