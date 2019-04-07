import React from 'react'
import { View } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { Subscribe } from 'unstated'
import { AddContainer } from 'store'
import { navigateToAddModel } from 'navigation-old/actions'
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
          <ProjectCategories
            ListHeaderComponent={
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
              </View>
            }
            onSelect={type => {
              updateField('type', type)
              navigateToAddModel()
            }}
          />
        </>
      )}
    </Subscribe>
  )
}

export default withTranslation('AddProjectType')(AddProjectType)
