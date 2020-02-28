import { Navigation } from 'react-native-navigation'
import { TextInput } from 'react-native'
import useComponentId from './useComponentId'
import { TABS_INDEX } from '../constants'
import * as api from '../api'

export default function useNavigation() {
  const componentId = useComponentId()

  return {
    ...api,
    dismissModal: (root, tabIndex = TABS_INDEX.FEED) => {
      Navigation.dismissModal(componentId)

      if (typeof root === 'boolean') {
        api.selectTabIndex(tabIndex)
      }
    },
    navigate: (screen, { options, ...passProps } = {}) => {
      const currentlyFocusedField = TextInput.State
      if (currentlyFocusedField) {
        currentlyFocusedField.blurTextInput()
      }

      Navigation.push(componentId, {
        component: {
          name: screen,
          options,
          passProps,
        },
      })
    },
    navigateBack: () => {
      Navigation.pop(componentId)
    },
  }
}
