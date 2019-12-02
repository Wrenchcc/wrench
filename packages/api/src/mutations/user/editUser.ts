import { UserInputError } from 'apollo-server-express'
import { DateTime } from 'luxon'
import { isAuthenticated } from '../../utils/permissions'
import { LOCALE_COLUMN, TIMEZONE_COLUMN } from '../../models/UserSettings'

// NOTE: If input is empty string the value will be deleted
export default isAuthenticated(async (_, args, ctx) => {
  let data = {}

  if (args.input.interestedIn) {
    const interestedIn = args.input.interestedIn.map(({ id }) => ({
      projectTypeId: id,
      userId: ctx.userId,
    }))

    // Note: Delete pre saved and then save new ones
    await ctx.db.UserInterestedIn.delete({ userId: ctx.userId })
    await ctx.db.UserInterestedIn.save(interestedIn)
  }

  if (args.input.locale) {
    const savedLocale = await ctx.db.UserSettings.findOne({
      where: {
        type: LOCALE_COLUMN,
        userId: ctx.userId,
      },
    })

    if (savedLocale) {
      await ctx.db.UserSettings.update(savedLocale.id, {
        value: args.input.locale,
      })
    } else {
      await ctx.db.UserSettings.save({
        type: LOCALE_COLUMN,
        userId: ctx.userId,
        value: args.input.locale,
      })
    }
  }

  if (args.input.timezone) {
    if (!DateTime.local().setZone(args.input.timezone).isValid) {
      return new UserInputError('Not a supported timezone.')
    }

    const savedTimezone = await ctx.db.UserSettings.findOne({
      where: {
        type: TIMEZONE_COLUMN,
        userId: ctx.userId,
      },
    })

    if (savedTimezone) {
      await ctx.db.UserSettings.update(savedTimezone.id, {
        value: args.input.timezone,
      })
    } else {
      await ctx.db.UserSettings.save({
        type: TIMEZONE_COLUMN,
        userId: ctx.userId,
        value: args.input.timezone,
      })
    }
  }

  if (args.input.firstName) {
    data = {
      ...data,
      firstName: args.input.firstName,
    }
  }

  if (args.input.lastName) {
    data = {
      ...data,
      lastName: args.input.lastName,
    }
  }

  if (args.input.bio) {
    data = {
      ...data,
      bio: args.input.bio,
    }
  }

  if (args.input.location) {
    data = {
      ...data,
      location: args.input.location,
    }
  }

  if (args.input.website) {
    data = {
      ...data,
      website: args.input.website,
    }
  }

  if (args.input.avatarUrl) {
    data = {
      ...data,
      isSilhouette: false,
      avatarUrl: args.input.avatarUrl,
    }
  }

  if (args.input.firstName && args.input.lastName) {
    data = {
      ...data,
      fullName: `${args.input.firstName} ${args.input.lastName}`,
    }
  }

  // Get empty input fields
  const keys = Object.keys(args.input)
  const emptyFields = keys.filter(key => args.input[key] === '')

  if (emptyFields.length > 0) {
    const nullObject = emptyFields.reduce((data, val) => {
      if (val) {
        // @ts-ignore
        data.isSilhouette = true
      }

      data[val] = null
      return data
    }, {})

    await ctx.db.User.update(ctx.userId, nullObject)
  }

  await ctx.db.User.update(ctx.userId, data)

  return ctx.loaders.user.load(ctx.userId)
})
