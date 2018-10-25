import React from 'react'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddProjectContainer } from 'store'
import { navigateToAddModel } from 'navigation'
import { Title } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import ProjectCategories from 'features/project/components/ProjectCategories'

function AddProjectCategory({ t }) {
  return (
    <Subscribe to={[AddProjectContainer]}>
      {({ updateField }) => (
        <>
          <AddProjectHeader icon={arrowLeft} />
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
                updateField('category', category)
                navigateToAddModel()
              }}
            />
          </View>
        </>
      )}
    </Subscribe>
  )
}

export default withNamespaces('AddProjectCategory')(AddProjectCategory)
