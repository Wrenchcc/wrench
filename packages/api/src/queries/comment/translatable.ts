import { getLanguagePartFromCode } from '../../utils/translations'

// TODO: Use dataloader
export default async ({ language, text }, _, ctx) => {
  if (ctx.userId) {
    const setting = await ctx.db.UserSettings.findOne({
      userId: ctx.userId,
      type: 'locale',
    })

    if (
      text &&
      text.length > 4 &&
      setting?.value &&
      getLanguagePartFromCode(setting?.value) !== language
    ) {
      return true
    }
  }

  return false
}
