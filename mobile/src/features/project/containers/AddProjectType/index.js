import React from 'react'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddContainer } from 'store'
import { navigateToAddModel } from 'navigation/actions'
import { Title } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import ProjectCategories from 'features/project/components/ProjectCategories'

function AddProjectType({ t }) {
  return (
    <Subscribe to={[AddContainer]}>
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
              {t('AddProjectType:title')}
            </Title>

            <ProjectCategories
              onSelect={type => {
                updateField('type', type)
                navigateToAddModel()
              }}
            />
          </View>
        </>
      )}
    </Subscribe>
  )
}

export default withNamespaces('AddProjectType')(AddProjectType)
