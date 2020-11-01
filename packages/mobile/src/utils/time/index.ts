import i18next from 'i18next'

function timeDifference(current, previous, long = false) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute) {
    if (long) {
      return i18next.t('time:now')
    }
    return `${Math.round(elapsed / 1000)}s`
  }

  if (elapsed < milliSecondsPerHour) {
    if (long) {
      return i18next.t('time:m', {
        count: Math.round(elapsed / milliSecondsPerMinute),
      })
    }
    return `${Math.round(elapsed / milliSecondsPerMinute)}m`
  }
  if (elapsed < milliSecondsPerDay) {
    if (long) {
      return i18next.t('time:h', { count: Math.round(elapsed / milliSecondsPerHour) })
    }
    return `${Math.round(elapsed / milliSecondsPerHour)}h`
  }
  if (elapsed < milliSecondsPerMonth) {
    if (long) {
      return i18next.t('time:d', {
        count: Math.round(elapsed / milliSecondsPerDay),
      })
    }
    return `${Math.round(elapsed / milliSecondsPerDay)}d`
  }
  if (elapsed < milliSecondsPerYear) {
    if (long) {
      return i18next.t('time:mo', { count: Math.round(elapsed / milliSecondsPerMonth) })
    }
    return `${Math.round(elapsed / milliSecondsPerMonth)}mo`
  }
  if (long) {
    return i18next.t('time:y', { count: Math.round(elapsed / milliSecondsPerYear) })
  }
  return `${Math.round(elapsed / milliSecondsPerYear)}y`
}

export function timeDifferenceForDate(date, long) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()

  if (long) {
    return timeDifference(now, updated, long)
  }

  return timeDifference(now, updated)
}
