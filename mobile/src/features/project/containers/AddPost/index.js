import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { pathOr } from 'ramda'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import Camera from 'features/project/components/Camera'
import AddPostHeader from 'features/project/components/AddPostHeader'
import AddCaption from 'features/project/components/AddCaption'
import ImageEditor from 'features/project/components/ImageEditor'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder, PLACEHOLDER_SIZE } from './styles'

class AddPost extends PureComponent {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      caption: '',
      currentImage: null,
      capturedImage: null,
      isEditing: false,
      dropdownOpen: false,
      selectedProject: pathOr(null, ['projects', 0, 'node'], props),
      // filesToUpload: [],
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

  addCurrentImage = currentImage => {
    this.setState({ currentImage })
  }

  onTakePicture = capturedImage => {
    this.toggleEdit()
    this.setState({ capturedImage })
  }

  onChangeCaption = caption => {
    this.setState({ caption })
  }

  render() {
    const { projects } = this.props
    const {
      caption,
      capturedImage,
      currentImage,
      dropdownOpen,
      isEditing,
      selectedProject,
    } = this.state

    const editImage = capturedImage || currentImage

    let component

    if (editImage) {
      component = (
        <ImageEditor
          image={editImage}
          size={PLACEHOLDER_SIZE}
          onCropping={image => console.log(image)}
        />
      )
    } else {
      component = <Camera onTakePicture={this.onTakePicture} />
    }

    return (
      <Base>
        <AddCaption
          isEditing={isEditing}
          caption={caption}
          onChangeCaption={this.onChangeCaption}
        />

        <AddPostHeader
          canEdit={!!editImage}
          changeProject={this.changeProject}
          isEditing={isEditing}
          projects={projects}
          selectedProject={selectedProject}
          toggleDropdown={this.toggleDropdown}
          toggleEdit={this.toggleEdit}
          dropdownOpen={dropdownOpen}
        />

        <Placeholder>{component}</Placeholder>
        <CameraRoll onSelect={this.addCurrentImage} />
      </Base>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  addPost,
  updatePostProgress
)(AddPost)
