import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Text, Icon } from 'ui'
import { closeDark } from 'images'

function AddProjectHeader({ t, actionRight, icon = closeDark, translationKey = 'next' }) {
  return (
    <Header
      headerLeft={<Icon onPress={() => navigateBack()} source={icon} />}
      headerCenter={
        <Text color="dark" medium>
          {t('AddProjectHeader:headerTitle')}
        </Text>
      }
      headerRight={
        actionRight && (
          <Text color="dark" medium onPress={actionRight}>
            {t(`AddProjectHeader:${translationKey}`)}
          </Text>
        )
      }
    />
  )
}

AddProjectHeader.propTypes = {
  actionRight: PropTypes.func,
  icon: PropTypes.number,
  translationKey: PropTypes.string,
}

export default withNamespaces('AddProjectHeader')(AddProjectHeader)
