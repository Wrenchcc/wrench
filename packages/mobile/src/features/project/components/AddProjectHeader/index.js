import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { navigateBack } from 'navigation/actions'
import { Header, Text, Icon } from 'ui'
import { closeDark } from 'images'

const AddProjectHeader = memo(({
  t,
  actionRight,
  icon = closeDark,
  translationKey = 'next',
  resetState,
  isSaving = false,
}) => (
    <Header
      headerLeft={
        <Icon
          onPress={() => {
            navigateBack()
            if (resetState) {
              resetState()
            }
          }}
          source={icon}
        />
      }
      headerCenter={
        <Text color="dark" medium>
          {t('AddProjectHeader:headerTitle')}
        </Text>
      }
      headerRight={
        isSaving ? (
          <ActivityIndicator size="small" color="dark" />
        ) : (
          actionRight && (
            <Text color="dark" medium onPress={actionRight}>
              {t(`AddProjectHeader:${translationKey}`)}
            </Text>
          )
        )
      }
    />
))

AddProjectHeader.propTypes = {
  actionRight: PropTypes.any,
  icon: PropTypes.number,
  isSaving: PropTypes.bool,
  resetState: PropTypes.func,
  translationKey: PropTypes.string,
}

export default withTranslation('AddProjectHeader')(AddProjectHeader)
