import { PluginFunc } from 'dayjs'

type FormatStr = 'rrrr' | 'rr' | 'rrrr' | 'rr' | string

export const jpFormat: PluginFunc = function (_o, c) {
  const proto = c.prototype
  const oldFormat = proto.format

  proto.format = function (formatStr: FormatStr) {
    const result = formatStr.replace(/\[([^\]]+)]|r+|/g, (match) => {
      const date = this.toDate()
      const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
        year: '2-digit',
        era: 'long'
      }).format(date)
      const digitRet = Intl.DateTimeFormat('ja-JP-u-ca-japanese').format(date)
      switch (match) {
        case 'rrrr':
          return ret
        case 'rrr':
          return ret.slice(0, 2)
        case 'rr':
          return digitRet.slice(0, 2)
        case 'r':
          return digitRet.slice(0, 1)
        default:
          return match
      }
    })
    return oldFormat.bind(this)(result)
  }
}
