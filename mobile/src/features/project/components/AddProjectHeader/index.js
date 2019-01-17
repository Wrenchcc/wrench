import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Text, Icon } from 'ui'
import { closeDark } from 'images'

function AddProjectHeader({
  t,
  actionRight,
  icon = closeDark,
  translationKey = 'next',
  resetState,
  isSaving = false,
}) {
  return (
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
          <ActivityIndicator size="small" color="black" />
        ) : (
          actionRight && (
            <Text color="dark" medium onPress={actionRight}>
              {t(`AddProjectHeader:${translationKey}`)}
            </Text>
          )
        )
      }
    />
  )
}

AddProjectHeader.propTypes = {
  actionRight: PropTypes.any,
  icon: PropTypes.number,
  isSaving: PropTypes.bool,
  resetState: PropTypes.func,
  translationKey: PropTypes.string,
}

export default withNamespaces('AddProjectHeader')(AddProjectHeader)
