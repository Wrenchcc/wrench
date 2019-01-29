import { LessThan, MoreThan } from 'typeorm'
import { decodeCursor } from './cursor'
import { ORDER_BY } from './constants'

export default ({ after, before }, { column, sort }) => {
  if (after) {
    const columnValue = decodeCursor(after)[1]
    const comparator = sort === ORDER_BY.sort ? LessThan(columnValue) : MoreThan(columnValue)
    return { [column]: comparator }
  }

  if (before) {
    const columnValue = decodeCursor(before)[1]
    const comparator = sort === ORDER_BY.sort ? MoreThan(columnValue) : LessThan(columnValue)
    return { [column]: comparator }
  }
}
