import { StatusBar } from 'react-native'
import { isIphone } from 'utils/platform'

const NAVIGATE = 'Navigation/NAVIGATE'
const NAVIGATE_BACK = 'Navigation/BACK'

const toggleStatusBar = hide => {
  if (isIphone) StatusBar.setHidden(hide, true)
}

const setDefaultStatusBar = () => {
  toggleStatusBar(false)
  StatusBar.setBarStyle('dark-content', true)
}

const changeStatusBar = routeName => {
  switch (routeName) {
    case 'add-post':
      toggleStatusBar(true)
      break
    case 'onboarding':
      StatusBar.setBarStyle('light-content', true)
      break
    default:
      setDefaultStatusBar()
  }
}

// NOTE: Change when react navigation has support for statusBarConfig
export default (prevState, newState, action) => {
  if (action.type === NAVIGATE || action.type === NAVIGATE_BACK) {
    changeStatusBar(action.routeName)
  }
}
