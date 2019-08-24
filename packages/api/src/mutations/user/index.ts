import authenticateFacebook from './authenticate/facebook'
import authenticateGoogle from './authenticate/google'
import banUser from './banUser'
import editUser from './editUser'
import refreshToken from './refreshToken'
import registerDeviceToken from './registerDeviceToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticateFacebook,
    authenticateGoogle,
    banUser,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
