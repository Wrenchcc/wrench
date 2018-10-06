import React, { PureComponent, Fragment } from 'react'
import { navigateBack } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeftWhite } from 'images'
import { Top } from './styles'

export default class AddPostHeader extends PureComponent {
  state = {
    expanded: false,
  }

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  renderHeaderLeft() {
    if (this.state.edit) {
      return <Icon onPress={() => console.log('close edit')} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    // if (!edit && page === CAMERA_ROLL_PAGE && !isEmpty(files)) {
    //   return (
    //     <Text color="white" medium onPress={() => this.openEdit()}>
    //       {this.props.t('AddPost:next')}
    //     </Text>
    //   )
    // }
    //
    // if (this.props.canPost) {
    //   return (
    //     <Text color="white" medium onPress={this.onSave}>
    //       {this.props.t('AddPost:post')}
    //     </Text>
    //   )
    // }

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
                title="Porject"
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
