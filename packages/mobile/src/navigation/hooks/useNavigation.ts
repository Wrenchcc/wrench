import { Navigation, Options } from 'react-native-navigation'
import useComponentId from './useComponentId'
import { SCREENS, TABS_INDEX } from '../constants'
import * as api from '../api'

type PassProps = { [passProp: string]: any }

type OptionsWithPassProps = {
  options?: Options
} & PassProps

export default function useNavigation() {
  const componentId = useComponentId()

  return {
    ...api,
    dismissModal: (root: boolean = false, tabIndex = TABS_INDEX.FEED) => {
      Navigation.dismissModal(componentId)

      if (root === true) {
        api.selectTabIndex(tabIndex)
      }
    },
    navigate: (screen: SCREENS, { options = {}, ...passProps }: OptionsWithPassProps = {}) => {
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
