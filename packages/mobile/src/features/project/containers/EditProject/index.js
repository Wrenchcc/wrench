import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, ActivityIndicator, Alert } from 'react-native'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { editProject } from 'graphql/mutations/project/editProject'
import { deleteProject } from 'graphql/mutations/project/deleteProject'
import { dismissModal, navigateToFeed } from 'navigation'
import { Text, Title, Header, Icon, Input, SelectionItem } from 'ui'
import { closeDark } from 'images'
import { Inner, Spacing } from './styles'

class EditProject extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    editProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const { project } = props

    this.state = {
      isSaving: false,
      commentsDisabled: project.commentsDisabled,
      title: project.title,
    }
  }

  get renderHeaderLeft() {
    const { isSaving } = this.state

    if (isSaving) {
      return <Icon source={closeDark} opacity={0.4} />
    }

    return <Icon onPress={() => dismissModal()} source={closeDark} />
  }

  get renderHeaderRight() {
    const { isSaving } = this.state

    return isSaving ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      <Text medium onPress={this.handleEditProject} hapticFeedback="impactLight">
        {this.props.t('EditProject:done')}
      </Text>
    )
  }

  get renderHeaderCenter() {
    const { t, project } = this.props
    return (
      <Text medium numberOfLines={1}>{`${t('EditProject:headerTitle')} ${project.title}`}</Text>
    )
  }

  onDelete = () => {
    this.props.deleteProject().then(navigateToFeed)
  }

  toggleActionSheet = () => {
    const { t, project } = this.props
    if (project.projectPermissions.isOwner) {
      Alert.alert(
        t('EditProject:deleteAlert'),
        t('EditProject:description'),
        [
          { text: t('EditProject:cancel'), style: 'cancel' },
          {
            text: t('EditProject:delete'),
            onPress: this.onDelete,
            style: 'destructive',
          },
        ],
        { cancelable: false }
      )
    }
  }

  updateField = (field, value) => {
    this.setState({ [field]: value })
  }

  onChangeText = title => {
    this.setState({ title })
  }

  handleEditProject = () => {
    const { title, commentsDisabled } = this.state
    this.setState({ isSaving: true })

    this.props
      .editProject({ title, commentsDisabled })
      .then(setTimeout(() => this.setState({ isSaving: false }, () => dismissModal()), 500))
  }

  render() {
    const { title, commentsDisabled } = this.state
    const { t } = this.props

    return (
      <>
        <Header
          headerLeft={this.renderHeaderLeft}
          headerRight={this.renderHeaderRight}
          headerCenter={this.renderHeaderCenter}
        />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}>
          <Inner>
            <Title>{t('EditProject:information')}</Title>
            <Input
              placeholder={t('EditProject:title')}
              value={title}
              onChangeText={this.onChangeText}
              color="dark"
              onSubmitEditing={this.handleEditProject}
              returnKeyType="done"
            />
          </Inner>
          <Inner>
            <Title>{t('EditProject:projectSettings')}</Title>
            <SelectionItem
              type="switch"
              title={t('EditProject:disableComments')}
              selected={commentsDisabled}
              onPress={value => this.updateField('commentsDisabled', value)}
            />

            <Spacing />

            <SelectionItem
              last
              title={t('EditProject:deleteTitle')}
              onPress={this.toggleActionSheet}
            />
          </Inner>
        </ScrollView>
      </>
    )
  }
}

export default compose(
  deleteProject,
  editProject,
  withTranslation('EditProject')
)(EditProject)
