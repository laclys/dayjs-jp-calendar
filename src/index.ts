import { PluginFunc, Dayjs } from 'dayjs'

type FormatStr = 'RRRR' | 'RRR' | 'RR' | 'R' | string

/* 
 isShort: true  -> 令和
 isShort: false  -> 令和X
*/
const kanji = (date: Dayjs, isShort: boolean) => {
  try {
    const targetDay = date.toDate()
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: '2-digit',
      era: 'long'
    }).format(targetDay)
    return !isShort ? ret.slice(0, -1) : ret.slice(0, 2)
  } catch {
    return 'unknown'
  }
}

/* 
 isShort: true  -> R
 isShort: false  -> RX
*/
const code = (date: Dayjs, isShort: boolean) => {
  try {
    const targetDay = date.toDate()
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: 'short'
    })
      .format(targetDay)
      .replace(/明治|大正|昭和|平成|令和/g, (match) => {
        switch (match) {
          case '明治':
            return 'Ｍ'
          case '大正':
            return 'T'
          case '昭和':
            return 'S'
          case '平成':
            return 'Ｈ'
          case '令和':
            return 'R'
          default:
            return match
        }
      })
    return !isShort ? ret.split('/')[0] : ret.slice(0, 1)
  } catch {
    return 'unknown'
  }
}

export const jpCalendar: PluginFunc = function (_o, c) {
  const proto = c.prototype
  const oldFormat = proto.format

  proto.format = function (formatStr: FormatStr) {
    const result = formatStr.replace(/(\[[^\]]+])|RRRR|RRR|RR|R/g, (match) => {
      switch (match) {
        case 'RRRR':
          return kanji(this, false)
        case 'RRR':
          return kanji(this, true)
        case 'RR':
          return code(this, false)
        case 'R':
          return code(this, true)
        default:
          console.log('match', match)
          return match
      }
    })
    /* This code handles the predefined "H" and "M" fields within Day.js */
    return oldFormat.bind(this)(result).replace(/Ｈ/g, 'H').replace(/Ｍ/g, 'M')
  }
}

export default jpCalendar
