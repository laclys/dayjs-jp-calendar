import { PluginFunc, Dayjs } from 'dayjs'

type FormatStr = 'RRRR' | 'RRR' | 'RR' | 'R' | 'rr' | 'r' | string

const MIN_YEAR = 1868

/* 
 onlyGengo: true  -> 令和
 onlyGengo: false  -> 令和X
*/
const kanji = (date: Dayjs, onlyGengo: boolean) => {
  try {
    if (date.get('year') < MIN_YEAR) return '-'
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: '2-digit',
      era: 'long'
    }).format(date.toDate())
    return !onlyGengo ? ret.slice(0, -1) : ret.slice(0, 2)
  } catch {
    return 'unknown'
  }
}

/* 
 onlyGengo: true  -> R
 onlyGengo: false  -> RX
*/
const code = (date: Dayjs, onlyGengo: boolean) => {
  try {
    if (date.get('year') < MIN_YEAR) return '-'
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: 'short'
    })
      .format(date.toDate())
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
    return !onlyGengo ? ret.split('/')[0] : ret.slice(0, 1)
  } catch {
    return 'unknown'
  }
}

const symbol = (date: Dayjs, onlyGengo: boolean) => {
  try {
    if (date.get('year') < MIN_YEAR) return '-'
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: 'short'
    })
      .format(date.toDate())
      .replace(/明治|大正|昭和|平成|令和/g, (match) => {
        switch (match) {
          case '明治':
            return '㍾'
          case '大正':
            return '㍽'
          case '昭和':
            return '㍼'
          case '平成':
            return '㍻'
          case '令和':
            return '㋿'
          default:
            return match
        }
      })
    return !onlyGengo ? ret.split('/')[0] : ret.slice(0, 1)
  } catch {
    return 'unknown'
  }
}

export const jpCalendar: PluginFunc = function (_o, c) {
  const proto = c.prototype
  const oldFormat = proto.format

  proto.format = function (formatStr: FormatStr) {
    const result = formatStr.replace(
      /(\[[^\]]+])|RRRR|RRR|RR|R|rr|r/g,
      (match) => {
        switch (match) {
          case 'RRRR':
            return kanji(this, false)
          case 'RRR':
            return kanji(this, true)
          case 'RR':
            return code(this, false)
          case 'R':
            return code(this, true)
          case 'rr':
            return symbol(this, false)
          case 'r':
            return symbol(this, true)
          default:
            return match
        }
      }
    )
    /* This code handles the predefined "H" and "M" fields within Day.js */
    return oldFormat.bind(this)(result).replace(/Ｈ/g, 'H').replace(/Ｍ/g, 'M')
  }
}

export default jpCalendar
