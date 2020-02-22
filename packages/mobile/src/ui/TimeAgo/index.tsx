import React from 'react'
import Text from 'ui/Text'
import { timeDifferenceForDate } from 'utils/time'

const TimeAgo = ({ date, fontSize = 12, style = {}, long = false }) => (
  <Text color="subtle" fontSize={fontSize} style={style}>
    {timeDifferenceForDate(date, long)}
  </Text>
)

export default TimeAgo
