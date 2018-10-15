import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager, View } from 'react-native'
import { compose } from 'react-apollo'
import { translate } from 'react-i18next'
import { navigateToFeed } from 'navigation'
import { addPost } from 'graphql/mutations/post/addPost'
import { track, events } from 'utils/analytics'
import { upload } from 'utils/storage/s3'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input } from 'ui'

class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
  }

  onChangeCaption = caption => {
    // this.props.updatePostData({ caption })
  }

  addPost = () => {
    const { selectedFiles, selectedProject, caption } = null // this.props.postData
    navigateToFeed()

    InteractionManager.runAfterInteractions(async () => {
      try {
        const uploadedFiles = await upload(selectedFiles)

        await this.props.addPost({
          caption,
          projectId: selectedProject.id,
          files: uploadedFiles,
        })
        track(events.POST_CREATED)
      } catch {
        // TODO: Show error banner
        track(events.POST_CREATED_FAILED)
      }
    })
  }

  render() {
    const { t, caption } = this.props

    return (
      <Fragment>
        <AddPostHeader canGoToCaption={false} selectedProject={null} addPost={this.addPost} />
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <SelectedFiles selectedFiles={null} />

          <Input
            placeholder={t('AddPost:placeholder')}
            autoFocus
            onChangeText={this.onChangeCaption}
            value={caption}
          />
        </View>
      </Fragment>
    )
  }
}

export default compose(
  addPost,
  translate('AddPost')
)(AddPost)
