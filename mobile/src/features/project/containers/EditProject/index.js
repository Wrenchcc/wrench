import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import { Text, Input } from 'ui'

class EditProject extends PureComponent {
  static navigationOptions = ({ screenProps, navigation }) => ({
    headerTitle: `${screenProps.t('EditProject:title')} ${navigation.state.params.title}`,
    headerRight: (
      <Text color="dark" medium>
        {screenProps.t('EditProject:save')}
      </Text>
    ),
  })

  constructor(props) {
    super(props)
    const project = props.navigation.state.params

    this.state = {
      title: project.title,
    }
  }

  render() {
    const { title } = this.state

    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Input placeholder="Title" value={title} color="dark" />
      </ScrollView>
    )
  }
}

export default EditProject
