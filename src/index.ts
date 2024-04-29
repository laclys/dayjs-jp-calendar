import { PluginFunc, Dayjs } from 'dayjs'

type FormatStr = 'rrrr' | 'rr' | 'rrrr' | 'rr' | string

/* 
 isShort: true  -> 令和
 isShort: false  -> 令和X
*/
const kanji = (date: Dayjs, isShort: boolean) => {
  const targetDay = date.toDate()
  const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    year: '2-digit',
    era: 'long'
  }).format(targetDay)
  return !isShort ? ret.slice(0, 3) : ret.slice(0, 2)
}

/* 
 isShort: true  -> R
 isShort: false  -> RX
*/
const code = (date: Dayjs, isShort: boolean) => {
  const targetDay = date.toDate()
  const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese').format(targetDay)
  return !isShort ? ret.slice(0, 2) : ret.slice(0, 1)
}

export const jpCalendar: PluginFunc = function (_o, c) {
  const proto = c.prototype
  const oldFormat = proto.format

  proto.format = function (formatStr: FormatStr) {
    const result = formatStr.replace(/\[([^\]]+)]|r+|/g, (match) => {
      switch (match) {
        case 'rrrr':
          return kanji(this, false)
        case 'rrr':
          return kanji(this, true)
        case 'rr':
          return code(this, false)
        case 'r':
          return code(this, true)
        default:
          return match
      }
    })
    return oldFormat.bind(this)(result)
  }
}

export default jpCalendar
