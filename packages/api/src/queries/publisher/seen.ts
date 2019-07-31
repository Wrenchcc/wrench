import { DateTime } from 'luxon'

const date = DateTime.local()

export default ({ updatedAt }) => !date.hasSame(DateTime.fromSQL(updatedAt), 'day')
