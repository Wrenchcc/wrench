import React, { Component } from 'react'
import { View } from 'react-native'
import { navigateToFeed } from 'navigation'
import AddCaptionHeader from '../../components/AddCaptionHeader'

class AddCaption extends Component {
  addPost = () => {
    navigateToFeed()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddCaptionHeader
          canGoToCaption={false}
          changeProject={() => console.log('here')}
          projects={[]}
          selectedProject={{ title: 'BMW R100 project' }}
          toggleDropdown={() => console.log('toggle')}
          dropdownOpen={false}
          addPost={this.addPost}
        />
      </View>
    )
  }
}

export default AddCaption
