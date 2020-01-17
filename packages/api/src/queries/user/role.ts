import { isAdmin } from '../../utils/permissions'
import { USER_ROLES } from '../../utils/enums'

export default ({ id }) => {
  return isAdmin(id) ? USER_ROLES.ADMIN : USER_ROLES.USER
}
