import React from 'react'
import PropTypes from 'prop-types'
import Time from 'javascript-time-ago'
import { Text } from 'ui'

// TODO: Fix date
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
Time.locale(en)

// Create relative date/time formatter.
const timeAgo = new Time('en-US')

const TimeAgo = ({ date, fontSize = 12 }) => (
  <Text color="light_grey" fontSize={fontSize}>
    {timeAgo.format(new Date(date), 'twitter')}
  </Text>
)

TimeAgo.propTypes = {
  date: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
}

export default TimeAgo
