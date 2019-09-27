import { getDefaultAvatar, getAvatarById, getAvatarByFilename } from '../../utils/avatar'

export default async ({ id, avatarUrl, isSilhouette }) => {
  if (isSilhouette) {
    return getDefaultAvatar()
  }

  if (avatarUrl) {
    return getAvatarByFilename(avatarUrl)
  }

  return getAvatarById(id)
}
