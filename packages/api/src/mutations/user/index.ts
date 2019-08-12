import authenticateFacebook from './authenticate/facebook'
import authenticateGoogle from './authenticate/google'
import editUser from './editUser'
import refreshToken from './refreshToken'
import registerDeviceToken from './registerDeviceToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticateFacebook,
    authenticateGoogle,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
