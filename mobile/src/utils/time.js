function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute) {
    return `${Math.round(elapsed / 1000)}s`
  }
  if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecondsPerMinute)}m`
  }
  if (elapsed < milliSecondsPerDay) {
    return `${Math.round(elapsed / milliSecondsPerHour)}h`
  }
  if (elapsed < milliSecondsPerMonth) {
    return `${Math.round(elapsed / milliSecondsPerDay)}d`
  }
  if (elapsed < milliSecondsPerYear) {
    return `${Math.round(elapsed / milliSecondsPerMonth)}mo`
  }
  return `${Math.round(elapsed / milliSecondsPerYear)}y`
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}
