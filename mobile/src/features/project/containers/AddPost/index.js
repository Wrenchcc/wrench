import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import Camera from 'features/project/components/Camera'
import ImageEditor from 'features/project/components/ImageEditor'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder, PLACEHOLDER_SIZE } from './styles'

class AddPost extends PureComponent {
  state = {
    currentImage: null,
    filesToUpload: [],
  }

  addCurrentImage = currentImage => {
    this.setState({ currentImage })
  }

  render() {
    const { currentImage } = this.state
    return (
      <Base>
        <Placeholder>
          {currentImage && (
            <ImageEditor
              image={currentImage}
              size={PLACEHOLDER_SIZE}
              onCropping={image => console.log(image)}
            />
          )}
          {!currentImage && <Camera onTakePicture={() => console.log('onTakePicture')} />}
        </Placeholder>

        <CameraRoll onSelect={this.addCurrentImage} />
      </Base>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  addPost,
  updatePostProgress,
  translate('AddPost')
)(AddPost)
