import { Navigation } from 'react-native-navigation'
import { TextInput } from 'react-native'
import useComponentId from './useComponentId'
import * as api from '../api'

export default function useNavigation() {
  const componentId = useComponentId()

  return {
    ...api,
    dismissModal: (root, currentTabIndex) => {
      Navigation.dismissModal(componentId)

      if (root) {
        api.selectTabIndex(currentTabIndex)
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
