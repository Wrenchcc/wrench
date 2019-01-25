import React from 'react'
import PropTypes from 'prop-types'
import Text from 'ui/Text'
import { timeDifferenceForDate } from 'utils/time'

const TimeAgo = ({ date, fontSize = 12 }) => (
  <Text color="light_grey" fontSize={fontSize}>
    {timeDifferenceForDate(date)}
  </Text>
)

TimeAgo.propTypes = {
  date: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
}

export default TimeAgo
