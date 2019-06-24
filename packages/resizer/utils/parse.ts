import * as qs from 'querystring'
import { isArray } from 'util'
import { Query } from './resize'

const value = (str?: string | string[]): string => (isArray(str) ? str[0] : str)
const parseNum = str => parseInt(value(str), 10)

export default (query: string): Query => {
  const { w, h, webp, dpr } = qs.parse(query)

  return {
    dpr: parseNum(dpr),
    height: h && parseNum(h),
    webp: Boolean(webp),
    width: w && parseNum(w),
  }
}
