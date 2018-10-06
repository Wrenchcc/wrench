import React, { PureComponent } from 'react'
import { compose } from 'react-apollo'
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
  state = {
    currentImage: null,
    capturedImage: null,
    isEditing: false,
    // filesToUpload: [],
  }

  get canEdit() {
    return !!this.state.currentImage
  }

  toggleEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      ...(prevState.isEditing && { capturedImage: null }),
    }))
  }

  addCurrentImage = currentImage => {
    this.setState({ currentImage })
  }

  onTakePicture = capturedImage => {
    this.toggleEdit()
    this.setState({ capturedImage })
  }

  render() {
    const { currentImage, capturedImage, isEditing } = this.state

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
        <AddCaption isEditing={isEditing} />
        <AddPostHeader canEdit={this.canEdit} toggleEdit={this.toggleEdit} isEditing={isEditing} />
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
