import DeviceInfo from 'react-native-device-info'

export const appVersion = `v${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`
