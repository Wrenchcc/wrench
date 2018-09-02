import { AppRegistry } from 'react-native'
import codePush from 'react-native-code-push'
import { checkFrequency } from 'utils/codePush'
import App from './src/App'

const AppWithCodePush = codePush(checkFrequency)(App)

AppRegistry.registerComponent('Wrench', () => AppWithCodePush)
