import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Icon, Text } from 'ui'
import { arrowLeft } from 'images'

class AddCaptionHeader extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    selectedProject: PropTypes.object.isRequired,
  }

  renderHeaderRight() {
    const { t, addPost } = this.props
    return (
      <Text color="dark" medium onPress={addPost}>
        {t('AddCaptionHeader:share')}
      </Text>
    )
  }

  render() {
    const { selectedProject } = this.props

    return (
      <Header
        headerLeft={<Icon onPress={() => navigateBack()} source={arrowLeft} />}
        headerRight={this.renderHeaderRight()}
        headerCenter={<Text medium>{selectedProject.title}</Text>}
      />
    )
  }
}

export default translate('AddCaptionHeader')(AddCaptionHeader)
