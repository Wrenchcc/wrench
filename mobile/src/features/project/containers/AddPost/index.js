import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager, View } from 'react-native'
import { Subscribe } from 'unstated'
import { AddPostContainer, ToastNotification } from 'store'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
import { navigateToFeed } from 'navigation'
import { addPost } from 'graphql/mutations/post/addPost'
import { track, events } from 'utils/analytics'
import { uploadFiles } from 'utils/storage/s3'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input } from 'ui'

class AddPost extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
  }

  addPost = ({ state, showPostProgress, resetState }, showNotification) => {
    navigateToFeed()

    showPostProgress({
      image: state.selectedFiles[0].uri,
      title: 'BMW R100 project',
    })

    InteractionManager.runAfterInteractions(async () => {
      try {
        const uploadedFiles = await uploadFiles(state.selectedFiles)

        await this.props
          .addPost({
            caption: state.caption,
            projectId: state.selectedProjectId,
            files: uploadedFiles,
          })
          .then(() => {
            resetState()
          })

        track(events.POST_CREATED)
      } catch {
        showNotification({
          type: 'error',
          message: 'hello world',
          dismissAfter: 2000,
        })

        track(events.POST_CREATED_FAILED)
      }
    })
  }

  render() {
    const { t } = this.props

    return (
      <Subscribe to={[AddPostContainer, ToastNotification]}>
        {(PostContainer, { showNotification }) => (
          <>
            <AddPostHeader
              changeProject={PostContainer.changeProject}
              closeSelectProject={PostContainer.closeSelectProject}
              selectedProjectId={PostContainer.state.selectedProjectId}
              selectProjectOpen={PostContainer.state.selectProjectOpen}
              addPostAction={() => this.addPost(PostContainer, showNotification)}
              toggleSelectProject={PostContainer.toggleSelectProject}
            />
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <SelectedFiles selectedFiles={PostContainer.state.selectedFiles} />

              <Input
                autoFocus
                color="dark"
                onChangeText={PostContainer.updateCaption}
                placeholder={t('AddPost:placeholder')}
                value={PostContainer.state.caption}
              />
            </View>
          </>
        )}
      </Subscribe>
    )
  }
}

export default compose(
  addPost,
  withNamespaces('AddPost')
)(AddPost)
