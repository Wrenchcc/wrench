import authenticateFacebook from './authenticate/facebook'
import authenticateGoogle from './authenticate/google'
import banUser from './banUser'
import deleteCurrentUser from './deleteCurrentUser'
import editUser from './editUser'
import refreshToken from './refreshToken'
import registerDeviceToken from './registerDeviceToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticateFacebook,
    authenticateGoogle,
    banUser,
    deleteCurrentUser,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
