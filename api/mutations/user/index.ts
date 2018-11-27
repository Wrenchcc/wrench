import authenticate from './authenticate'
import editUser from './editUser'
import refreshToken from './refreshToken'
import toggleNotificationSettings from './toggleNotificationSettings'

export default {
  Mutation: {
    authenticate,
    editUser,
    refreshToken,
    toggleNotificationSettings,
  },
}
