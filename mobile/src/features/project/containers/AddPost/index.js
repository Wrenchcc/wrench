import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { compose } from 'react-apollo'
import { translate } from 'react-i18next'
import { navigateToFeed } from 'navigation'
import { addPost } from 'graphql/mutations/post/addPost'
import { getPostData } from 'graphql/queries/post/getPostData'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input } from 'ui'

// TODO: Add caption, re-add project selection, post on addPost
class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    postData: PropTypes.object.isRequired,
  }

  addPost = () => {
    // this.props.addPost()
    navigateToFeed()
  }

  render() {
    const { t, postData } = this.props

    return (
      <Fragment>
        <AddPostHeader canGoToCaption={false} selectedProject={null} addPost={this.addPost} />
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <SelectedFiles selectedFiles={null} />

          <Input placeholder={t('AddPost:placeholder')} autoFocus />
        </View>
      </Fragment>
    )
  }
}

export default compose(
  addPost,
  getPostData,
  translate('AddPost')
)(AddPost)
