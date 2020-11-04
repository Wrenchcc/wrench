import { getLanguagePartFromCode } from '../../utils/translations'

// TODO: Use dataloader
export default async ({ language, caption }, _, ctx) => {
  if (ctx.userId) {
    const setting = await ctx.db.UserSettings.findOne({
      userId: ctx.userId,
      type: 'locale',
    })

    if (caption && setting?.value && getLanguagePartFromCode(setting?.value) !== language) {
      return true
    }
  }

  return false
}
