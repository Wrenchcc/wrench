import { links } from 'react-native-firebase'
import { navigateBasedOnPath } from './path'

export function handleDynamicLinks() {
  links().onLink(navigateBasedOnPath)
}
