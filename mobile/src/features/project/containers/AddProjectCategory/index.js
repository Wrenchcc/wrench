import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddProjectContainer } from 'store'
import { navigateToAddModel } from 'navigation'
import { Title } from 'ui'
import ProjectCategories from 'features/project/components/ProjectCategories'

class AddProjectCategory extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.t('AddProjectCategory:headerTitle'),
  })

  render() {
    const { t } = this.props

    return (
      <Subscribe to={[AddProjectContainer]}>
        {({ updateField }) => (
          <View
            style={{
              flex: 1,
              paddingTop: 30,
            }}
          >
            <Title
              large
              numberOfLines={0}
              style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50 }}
            >
              {t('AddProjectCategory:title')}
            </Title>

            <ProjectCategories
              onSelect={category => {
                updateField('model', category.id)
                navigateToAddModel()
              }}
            />
          </View>
        )}
      </Subscribe>
    )
  }
}

export default withNamespaces('AddProjectCategory')(AddProjectCategory)
