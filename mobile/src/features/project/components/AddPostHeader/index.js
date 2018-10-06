import React, { PureComponent, Fragment } from 'react'
import { translate } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeftWhite } from 'images'
import { Top } from './styles'

class AddPostHeader extends PureComponent {
  state = {
    expanded: false,
  }

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  renderHeaderLeft() {
    if (this.props.isEditing) {
      return <Icon onPress={this.props.toggleEdit} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    if (this.props.canEdit && !this.props.isEditing) {
      return (
        <Text color="white" medium onPress={this.props.toggleEdit}>
          {this.props.t('AddPostHeader:next')}
        </Text>
      )
    }

    if (this.props.isEditing) {
      return (
        <Text color="white" medium onPress={() => console.log('post')}>
          {this.props.t('AddPostHeader:post')}
        </Text>
      )
    }

    return null
  }

  render() {
    return (
      <Fragment>
        <SelectProject
          expanded={this.state.expanded}
          onPress={() => console.log('selected')}
          projects={[]}
          selected={null}
        />

        <Top>
          <Header
            headerLeft={this.renderHeaderLeft()}
            headerRight={this.renderHeaderRight()}
            headerCenter={
              <Dropdown
                title="BMW R100 project"
                onPress={this.toggleDropdown}
                active={this.state.expanded}
              />
            }
          />
        </Top>
      </Fragment>
    )
  }
}

export default translate('AddPostHeader')(AddPostHeader)
