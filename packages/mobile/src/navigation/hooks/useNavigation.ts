import useComponentId from './useComponentId'
import * as api from '../api'

export default function useNavigation() {
  const componentId = useComponentId()

  return {
    ...api,
    dismissModal: (screen, options) => api.dismissModal(screen, options)(componentId),
    navigate: (screen, options) => api.navigate(screen, options)(componentId),
    navigateBack: (screen, options) => api.navigateBack(screen, options)(componentId),
  }
}
