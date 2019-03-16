import authenticateFacebook from './authenticate/facebook'
import editUser from './editUser'
import refreshToken from './refreshToken'
import registerDeviceToken from './registerDeviceToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticateFacebook,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
