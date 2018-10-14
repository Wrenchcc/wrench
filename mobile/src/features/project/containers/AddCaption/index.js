import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { translate } from 'react-i18next'
import { navigateToFeed } from 'navigation'
import AddCaptionHeader from 'features/project/components/AddCaptionHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input } from 'ui'

class AddCaption extends Component {
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
        <AddCaptionHeader
          canGoToCaption={false}
          selectedProject={selectedProject}
          addPost={this.addPost}
        />
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <SelectedFiles selectedFiles={selectedFiles} />

          <Input placeholder={t('AddCaption:placeholder')} autoFocus />
        </View>
      </Fragment>
    )
  }
}

export default translate('AddCaption')(AddCaption)
