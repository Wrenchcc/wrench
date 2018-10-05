import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import { track, events } from 'utils/analytics'
import Camera from 'features/project/components/Camera'
import ImageEditor from 'features/project/components/ImageEditor'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder, PLACEHOLDER_SIZE } from './styles'

// const images = [
//   {
//     filename: 'wefwef.jpg',
//     offset: {
//       x: 0,
//       y: 0,
//     },
//   },
// ]

class AddPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: null,
      // filesToUpload: [],
    }

    track(events.POST_CREATED_INITED)
  }

  render() {
    return (
      <Base>
        <Placeholder>
          {this.state.currentImage && (
            <ImageEditor
              image={this.state.currentImage}
              size={PLACEHOLDER_SIZE}
              onCropping={image => console.log(image)}
            />
          )}
          {/* <Camera onTakePicture={() => console.log('onTakePicture')} /> */}
        </Placeholder>

        <CameraRoll onSelect={currentImage => this.setState({ currentImage })} />
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
