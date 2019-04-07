import { Navigation } from 'react-native-navigation'
import { TabNavigation } from 'navigation'

Navigation.events().registerAppLaunchedListener(TabNavigation)
