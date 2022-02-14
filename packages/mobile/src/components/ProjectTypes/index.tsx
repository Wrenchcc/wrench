import React, { useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useProjectTypesQuery } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Text, Touchable } from 'ui'
import PlatformColor from 'ui/PlatformColor'
import Skeleton from './Skeleton'

const GUTTER = 20
const BAR_SPACE = GUTTER / 2

const styles = {
  base: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: PlatformColor.default,
  },
  button: {
    height: 40,
    borderWidth: 1,
    borderColor: PlatformColor.divider,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
}

function ProjectTypes({ visible }) {
  const { t } = useTranslation('project-types')
  const { data: typesData, loading: loadingTypes } = useProjectTypesQuery()

  const { navigate } = useNavigation()

  const handleNavigation = useCallback((category) => {
    navigate(SCREENS.CATEGORIES, category)
  }, [])

  const navigateToInsp = useCallback(() => {
    navigate(SCREENS.INSPIRATION, {
      options: {
        statusBar: {
          visible: false,
          animated: true,
        },
        bottomTabs: {
          visible: false,
          animate: true,
        },
      },
    })
  }, [])

  if (!typesData?.types && loadingTypes) {
    return (
      <View style={styles.base}>
        <Skeleton />
      </View>
    )
  }

  if (!visible) {
    return null
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.base}>
      <Touchable
        style={[
          styles.button,
          {
            marginLeft: GUTTER,
            marginRight: BAR_SPACE,
          },
        ]}
        onPress={navigateToInsp}
      >
        <Text fontSize={15} medium>
          {t('inspo')}
        </Text>
      </Touchable>

      {typesData.types.map((category, index) => (
        <Touchable
          key={category.id}
          style={[
            styles.button,
            {
              marginRight: index === typesData.types?.length - 1 ? GUTTER : BAR_SPACE,
            },
          ]}
          onPress={() => handleNavigation(category)}
        >
          <Text fontSize={15} medium>
            {category.title}
          </Text>
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default ProjectTypes
