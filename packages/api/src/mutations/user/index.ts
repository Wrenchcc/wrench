import authenticateApple from './authenticate/apple'
import authenticateFacebook from './authenticate/facebook'
import authenticateGoogle from './authenticate/google'
import banUser from './banUser'
import deleteCurrentUser from './deleteCurrentUser'
import deleteUser from './deleteUser'
import editUser from './editUser'
import refreshToken from './refreshToken'
import registerDeviceToken from './registerDeviceToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticateApple,
    authenticateFacebook,
    authenticateGoogle,
    banUser,
    deleteCurrentUser,
    deleteUser,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
