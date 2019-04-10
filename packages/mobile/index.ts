import { YellowBox } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { AppNavigation, AuthNavigation } from 'navigation'

YellowBox.ignoreWarnings(['RCTImagePickerManager', 'RCTDevLoadingView'])

Navigation.events().registerAppLaunchedListener(AppNavigation || AuthNavigation)
