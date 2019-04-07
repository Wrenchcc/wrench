import { StatusBar } from 'react-native'
import { isAndroid } from 'utils/platform'

const NAVIGATE = 'Navigation/NAVIGATE'
const NAVIGATE_BACK = 'Navigation/BACK'

const toggleStatusBar = hide => {
  StatusBar.setHidden(hide, true)
}

const setBarStyle = style => {
  StatusBar.setBarStyle(style, true)
}

const setDefaultStatusBar = () => {
  toggleStatusBar(false)
  if (isAndroid) {
    StatusBar.setBackgroundColor('white')
  }
  StatusBar.setBarStyle('dark-content')
}

const changeStatusBar = routeName => {
  switch (routeName) {
    case 'add-media':
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
