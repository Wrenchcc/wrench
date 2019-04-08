import { YellowBox } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { TabNavigation } from 'navigation'

YellowBox.ignoreWarnings(['RCTImagePickerManager', 'RCTDevLoadingView'])

Navigation.events().registerAppLaunchedListener(TabNavigation)
