import { links } from 'react-native-firebase'
import { navigateBasedOnPath } from './path'

export const handleDynamicLinks = () => {
  links().onLink(navigateBasedOnPath)
}
