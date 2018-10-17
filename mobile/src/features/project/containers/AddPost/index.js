import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager, View } from 'react-native'
import { Subscribe } from 'unstated'
import { AddPostContainer } from 'store'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
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

  addPost = ({ selectedFiles, selectedProject, caption }, showNotification) => {
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
        // showToastNotification({
        //   kind: 'error',
        //   id: 'post-error',
        //   message: 'hello world',
        //   dismissAfter: 2000,
        // })
        track(events.POST_CREATED_FAILED)
      }
    })
  }

  render() {
    const { t } = this.props

    return (
      <Subscribe to={[AddPostContainer]}>
        {(
          { state, updateCaption, toggleSelectProject, changeProject, closeSelectProject },
          showNotification
        ) => (
          <>
            <AddPostHeader
              changeProject={changeProject}
              closeSelectProject={closeSelectProject}
              selectedProjectIndex={state.selectedProjectIndex}
              selectProjectOpen={state.selectProjectOpen}
              addPostAction={() => this.addPost(state, showNotification)}
              toggleSelectProject={toggleSelectProject}
            />
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <SelectedFiles selectedFiles={state.selectedFiles} />

              <Input
                autoFocus
                color="dark"
                onChangeText={updateCaption}
                placeholder={t('AddPost:placeholder')}
                value={state.caption}
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
