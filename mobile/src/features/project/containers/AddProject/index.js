import React, { PureComponent } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddProjectContainer } from 'store'
import { navigateToAddProjectCategory } from 'navigation'
import { Title, Input } from 'ui'

class AddProject extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.t('AddProject:headerTitle'),
  })

  render() {
    const { t } = this.props

    return (
      <Subscribe to={[AddProjectContainer]}>
        {({ state, updateField }) => (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={20}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
              {t('AddProject:title')}
            </Title>
            <Input
              placeholder={t('AddProject:placeholder')}
              autoFocus
              large
              onChangeText={value => updateField('title', value)}
              value={state.title}
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => navigateToAddProjectCategory()}
            />
          </KeyboardAvoidingView>
        )}
      </Subscribe>
    )
  }
}

export default withNamespaces('AddProject')(AddProject)
