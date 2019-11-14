import React from 'react'
import { timeDifferenceForDate } from '../../utils/time'
import Text from '../Text'

const TimeAgo = ({ date, fontSize = 12 }) => (
  <Text color="light_grey" fontSize={fontSize}>
    {timeDifferenceForDate(date)}
  </Text>
)

export default TimeAgo
