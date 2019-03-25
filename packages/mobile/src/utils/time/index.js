import i18next from 'i18next'

function timeDifference(current, previous, long = false) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute) {
    return i18next.t('Time:now')
  }

  if (elapsed < milliSecondsPerHour) {
    if (long) {
      return i18next.t('Time:long', {
        time: `${Math.round(elapsed / milliSecondsPerMinute)}m`,
      })
    }
    return `${Math.round(elapsed / milliSecondsPerMinute)}m`
  }
  if (elapsed < milliSecondsPerDay) {
    if (long) {
      return i18next.t('Time:long', { time: `${Math.round(elapsed / milliSecondsPerHour)}h` })
    }
    return `${Math.round(elapsed / milliSecondsPerHour)}h`
  }
  if (elapsed < milliSecondsPerMonth) {
    if (long) {
      return i18next.t('Time:long', {
        time: `${Math.round(elapsed / milliSecondsPerDay)}d`,
      })
    }
    return `${Math.round(elapsed / milliSecondsPerDay)}d`
  }
  if (elapsed < milliSecondsPerYear) {
    if (long) {
      return i18next.t('Time:long', { time: `${Math.round(elapsed / milliSecondsPerMonth)}mo` })
    }
    return `${Math.round(elapsed / milliSecondsPerMonth)}mo`
  }
  if (long) {
    return i18next.t('Time:long', { time: `${Math.round(elapsed / milliSecondsPerYear)}y` })
  }
  return `${Math.round(elapsed / milliSecondsPerYear)}y`
}

export function timeDifferenceForDate(date, long) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()

  if (long) {
    return timeDifference(now, updated, long).toUpperCase()
  }

  return timeDifference(now, updated)
}
