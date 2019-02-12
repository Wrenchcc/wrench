import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { decodeCursor } from './cursor'
import { ORDER_BY } from './constants'

export default ({ after, before }, { column, sort }) => {
  if (after) {
    const columnValue = decodeCursor(after)[1]
    const comparator = sort === ORDER_BY.sort ? LessThanOrEqual(columnValue) : MoreThanOrEqual(columnValue)
    return { [column]: comparator }
  }

  if (before) {
    const columnValue = decodeCursor(before)[1]
    const comparator = sort === ORDER_BY.sort ? MoreThanOrEqual(columnValue) : LessThanOrEqual(columnValue)
    return { [column]: comparator }
  }
}
