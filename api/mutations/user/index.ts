import authenticate from './authenticate'
import editUser from './editUser'
import refreshToken from './refreshToken'
import toggleNotificationSettings from './toggleNotificationSettings'
import registerDeviceToken from './registerDeviceToken'

export default {
  Mutation: {
    authenticate,
    editUser,
    refreshToken,
    registerDeviceToken,
    toggleNotificationSettings,
  },
}
