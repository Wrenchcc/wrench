import { Navigation } from 'react-native-navigation'
import { AppNavigation } from 'navigation'

Navigation.events().registerAppLaunchedListener(AppNavigation)
