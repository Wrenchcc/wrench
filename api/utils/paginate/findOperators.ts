import { LessThan, MoreThan } from 'typeorm'
import { decodeCursor } from './cursor'
import { ORDER_BY } from './constants'

export default ({ after, before }, { column, sort }) => {
  if (after) {
    const [id, columnValue] = decodeCursor(after)
    const comparator = sort === ORDER_BY.sort ? LessThan(columnValue) : MoreThan(columnValue)
    return { [column]: comparator }
  }

  if (before) {
    const [id, columnValue] = decodeCursor(before)
    const comparator = sort === ORDER_BY.sort ? MoreThan(columnValue) : LessThan(columnValue)
    return { [column]: comparator }
  }
}
