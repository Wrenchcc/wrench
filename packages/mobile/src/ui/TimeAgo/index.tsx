import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'

function timeDifference(t, current, previous, long = false) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute) {
    if (long) {
      return t('now')
    }
    return `${Math.round(elapsed / 1000)}s`
  }

  if (elapsed < milliSecondsPerHour) {
    if (long) {
      return t('m', {
        count: Math.round(elapsed / milliSecondsPerMinute),
      })
    }
    return `${Math.round(elapsed / milliSecondsPerMinute)}m`
  }
  if (elapsed < milliSecondsPerDay) {
    if (long) {
      return t('h', { count: Math.round(elapsed / milliSecondsPerHour) })
    }
    return `${Math.round(elapsed / milliSecondsPerHour)}h`
  }
  if (elapsed < milliSecondsPerMonth) {
    if (long) {
      return t('d', { count: Math.round(elapsed / milliSecondsPerDay) })
    }
    return `${Math.round(elapsed / milliSecondsPerDay)}d`
  }
  if (elapsed < milliSecondsPerYear) {
    if (long) {
      return t('mo', { count: Math.round(elapsed / milliSecondsPerMonth) })
    }
    return `${Math.round(elapsed / milliSecondsPerMonth)}mo`
  }
  if (long) {
    return t('y', { count: Math.round(elapsed / milliSecondsPerYear) })
  }
  return `${Math.round(elapsed / milliSecondsPerYear)}y`
}

export function timeDifferenceForDate(date, long, t) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()

  if (long) {
    return timeDifference(t, now, updated, long)
  }

  return timeDifference(t, now, updated)
}

const TimeAgo = ({ date, fontSize = 12, style = {}, long = false }) => {
  const { t } = useTranslation('time')

  return (
    <Text color="neutral" fontSize={fontSize} style={style}>
      {timeDifferenceForDate(date, long, t)}
    </Text>
  )
}

export default TimeAgo
