import { StatusBar } from 'react-native'
import { isIphone } from 'utils/platform'

const NAVIGATE = 'Navigation/NAVIGATE'
const NAVIGATE_BACK = 'Navigation/BACK'

const toggleStatusBar = hide => {
  StatusBar.setHidden(hide, true)
}

const setBarStyle = style => {
  if (isIphone) StatusBar.setBarStyle(style, true)
}

const setDefaultStatusBar = () => {
  toggleStatusBar(false)
  setBarStyle('dark-content')
}

const changeStatusBar = routeName => {
  switch (routeName) {
    case 'add-post':
      toggleStatusBar(true)
      break
    case 'onboarding':
      setBarStyle('light-content')
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
