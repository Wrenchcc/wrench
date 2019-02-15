import { LessThanOrEqual, MoreThanOrEqual, Not, Equal } from 'typeorm'
import { decodeCursor } from './cursor'
import { ORDER_BY } from './constants'

export default ({ after, before }, { column, sort }) => {
  if (after) {
    const [id, columnValue] = decodeCursor(after)
    const comparator = sort === ORDER_BY.sort ? LessThanOrEqual(columnValue) : MoreThanOrEqual(columnValue)
    return { [column]: comparator, id: Not(Equal(id)) }
  }

  if (before) {
    const [id, columnValue] = decodeCursor(before)
    const comparator = sort === ORDER_BY.sort ? MoreThanOrEqual(columnValue) : LessThanOrEqual(columnValue)
    return { [column]: comparator, id: Not(Equal(id)) }
  }
}
