import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateBack, navigateToAddPost, navigateToFeed } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close } from 'images'

class AddPostHeader extends PureComponent {
  static propTypes = {
    canGoToCaption: PropTypes.bool,
    changeProject: PropTypes.func.isRequired,
    selectProjectOpen: PropTypes.bool.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProjectIndex: PropTypes.object.isRequired,
    toggleSelectProject: PropTypes.func.isRequired,
  }

  renderHeaderRight() {
    const { t, canGoToCaption } = this.props
    if (canGoToCaption) {
      return (
        <Text color="white" medium onPress={() => navigateToAddPost()}>
          {t('AddPostHeader:next')}
        </Text>
      )
    }

    // if (canPost) {
    //   return (
    //     <Text color="white" medium onPress={() => navigateToFeed()}>
    //       {t('AddPostHeader:share')}
    //     </Text>
    //   )
    // }

    return null
  }

  render() {
    const {
      changeProject,
      projects,
      selectedProjectIndex,
      selectProjectOpen,
      toggleSelectProject,
    } = this.props

    return (
      <Fragment>
        <SelectProject
          expanded={selectProjectOpen}
          onPress={changeProject}
          projects={projects}
          selected={projects[selectedProjectIndex]}
        />
        <View
          style={{
            position: 'relative',
            zIndex: 20,
          }}
        >
          <Header
            headerLeft={<Icon onPress={() => navigateBack()} source={close} />}
            headerRight={this.renderHeaderRight()}
            headerCenter={
              <Dropdown
                title={projects[selectedProjectIndex].node.title}
                onPress={toggleSelectProject}
                active={selectProjectOpen}
              />
            }
          />
        </View>
      </Fragment>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  translate('AddPostHeader')
)(AddPostHeader)
