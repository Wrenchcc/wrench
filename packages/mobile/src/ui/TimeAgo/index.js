import React from 'react'
import PropTypes from 'prop-types'
import Text from 'ui/Text'
import { timeDifferenceForDate } from 'utils/time'

const TimeAgo = ({ date, fontSize = 12, style = {}, long = false }) => (
  <Text color="light_grey" fontSize={fontSize} style={style}>
    {timeDifferenceForDate(date, long)}
  </Text>
)

TimeAgo.propTypes = {
  date: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  long: PropTypes.bool,
  style: PropTypes.object,
}

export default TimeAgo
