import { getDefaultAvatar, getAvatarById } from '../../utils/avatar'

export default async ({ id, isSilhouette }) => {
  if (isSilhouette) {
    return getDefaultAvatar()
  }

  return getAvatarById(id)
}
