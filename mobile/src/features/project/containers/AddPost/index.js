import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import { track, events } from 'utils/analytics'
import Camera from 'features/project/components/Camera'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder } from './styles'

class AddPost extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // filesToUpload: [],
    }

    track(events.POST_CREATED_INITED)
  }

  render() {
    return (
      <Base>
        <Placeholder>
          <Camera onTakePicture={() => console.log('onTakePicture')} />
        </Placeholder>

        <CameraRoll />
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
