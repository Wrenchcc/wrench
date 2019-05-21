import * as qs from 'querystring'
import { isArray } from 'util'
import { Query } from './resize'

const value = (str?: string | string[]): string => (isArray(str) ? str[0] : str)
const parseNum = str => parseInt(value(str))

export default (query: string): Query => {
  const { w, h, webp, dpr, blurRadius } = qs.parse(query)

  return {
    blurRadius: Number(blurRadius),
    dpr: parseNum(dpr),
    height: h && parseNum(h),
    webp: Boolean(webp),
    width: w && parseNum(w),
  }
}
