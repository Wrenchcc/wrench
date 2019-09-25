import { getDefaultAvatar, getAvatarById } from '../../utils/avatar'

export default async ({ id, avatarUrl, isSilhouette }) => {
  if (isSilhouette) {
    return getDefaultAvatar()
  }

  return getAvatarById(avatarUrl || id)
}
