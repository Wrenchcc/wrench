import React from 'react'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddProjectContainer } from 'store'
import { Title, ProjectCategories } from 'ui'

function AddProjectCategory({ t }) {
  return (
    <Subscribe to={[AddProjectContainer]}>
      {({ state, updateField }) => (
        <View
          style={{
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

          <ProjectCategories />
        </View>
      )}
    </Subscribe>
  )
}

export default withNamespaces('AddProjectCategory')(AddProjectCategory)
