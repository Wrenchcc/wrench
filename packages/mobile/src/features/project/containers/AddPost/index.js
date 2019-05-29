import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, InteractionManager } from 'react-native'
import { pathOr } from 'ramda'
import { Subscribe } from 'unstated'
import { AddContainer, ToastNotificationContainer } from 'store'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { navigateToFeed } from 'navigation'
import { addPost } from 'graphql/mutations/post/addPost'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { uploadFiles } from 'utils/storage/s3'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input, KeyboardAvoidingView } from 'ui'

function getProjectByIdOrFirst(id, projects) {
  return pathOr(projects[0].node, ['node'], projects.find(({ node }) => node.id === id))
}

class AddPost extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
  }

  addPost = (PostContainer, showNotification) => {
    const { showPostProgress, state, resetState, hidePostProgress } = PostContainer
    const { t, projects } = this.props

    const { title, id } = getProjectByIdOrFirst(state.selectedProjectId, projects)

    navigateToFeed()

    showPostProgress({
      image: state.selectedFiles[0].uri,
      title,
    })

    InteractionManager.runAfterInteractions(async () => {
      try {
        const uploadedFiles = await uploadFiles(state.selectedFiles)

        await this.props
          .addPost({
            caption: state.caption,
            projectId: id,
            files: uploadedFiles,
          })
          .then(resetState)

        track(events.POST_CREATED)
      } catch (err) {
        hidePostProgress()

        showNotification({
          type: 'error',
          message: t('AddPost:error'),
          dismissAfter: 6000,
        })

        logError(err)
        track(events.POST_CREATED_FAILED)
      }
    })
  }

  render() {
    const { t } = this.props

    return (
      <Subscribe to={[AddContainer, ToastNotificationContainer]}>
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
            <KeyboardAvoidingView paddingHorizontal={0}>
              <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                <SelectedFiles selectedFiles={PostContainer.state.selectedFiles} />

                <Input
                  scrollEnabled={false}
                  multiline
                  autoFocus
                  waitForRender
                  color="dark"
                  onChangeText={PostContainer.updateCaption}
                  placeholder={t('AddPost:placeholder')}
                  value={PostContainer.state.caption}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        )}
      </Subscribe>
    )
  }
}

export default compose(
  addPost,
  getCurrentUserProjects,
  withTranslation('AddPost')
)(AddPost)
