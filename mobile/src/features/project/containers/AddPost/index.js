import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { translate } from 'react-i18next'
import { navigateToFeed } from 'navigation'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input } from 'ui'

// TODO: Add caption, re-add project selection, post on addPost
class AddPost extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  addPost = () => {
    navigateToFeed()
  }

  renderItem = () => <View />

  render() {
    const { t, navigation } = this.props
    const { selectedProject, selectedFiles } = navigation.state.params

    return (
      <Fragment>
        <AddPostHeader
          canGoToCaption={false}
          selectedProject={selectedProject}
          addPost={this.addPost}
        />
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <SelectedFiles selectedFiles={selectedFiles} />

          <Input placeholder={t('AddPost:placeholder')} autoFocus keyboardType="twitter" />
        </View>
      </Fragment>
    )
  }
}

export default translate('AddPost')(AddPost)
