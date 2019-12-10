import DeviceLocale from '@pontusab/react-native-device-locale'
import Config from 'react-native-config'

export default `v${DeviceLocale.buildNumber} (${Config.GITHUB_HASH})`
