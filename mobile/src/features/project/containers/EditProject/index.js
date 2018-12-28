import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
import { editProject } from 'graphql/mutations/project/editProject'
import { Text, Title, Input } from 'ui'
import { Inner } from './styles'

class EditProject extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    editProject: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ screenProps, navigation }) => ({
    headerTitle: `${screenProps.t('EditProject:headerTitle')} ${
      navigation.state.params.project.title
    }`,
    headerRight: (
      <Text
        color="dark"
        medium
        onPress={navigation.getParam('editProject')}
        hapticFeedback="impactLight"
      >
        {screenProps.t('EditProject:save')}
      </Text>
    ),
  })

  constructor(props) {
    super(props)
    const { project } = props.navigation.state.params

    this.state = {
      title: project.title,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ editProject: this.handleEditProject })
  }

  onChangeText = title => {
    this.setState({ title })
  }

  handleEditProject = () => {
    const { title } = this.state
    this.props.editProject({ title })
  }

  render() {
    const { title } = this.state
    const { t } = this.props

    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 40 }}>
        <Title>{t('EditProject:title')}</Title>
        <Inner>
          <Input placeholder="Title" value={title} onChangeText={this.onChangeText} color="dark" />
        </Inner>
      </ScrollView>
    )
  }
}

export default compose(
  editProject,
  withNamespaces('EditProject')
)(EditProject)
