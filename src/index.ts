import { PluginFunc, Dayjs } from 'dayjs'

/* Eg. 
２０２４年
rrrr　→　令和６年 
rrr　→　令和
rr →　R6 
r →　R 
 */
type FormatStr = 'RRRR' | 'RR' | 'rrrr' | 'rr' | string

const format = (str: string, dayjs: Dayjs) => {
  str.replace(/\[([^\]]+)]|r+|/g, (match) => {
    const date = dayjs.toDate()
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
}

export const jpCalendar: PluginFunc = (_option, dayjsClass, _dayjsFactory) => {
  const oldFormat = dayjsClass.prototype.format
  const proto = dayjsClass.prototype
  proto.format = function (template) {
    const ret = template ? format(template, this) : template
    return oldFormat.bind(this)(ret)
  }
}

export default jpCalendar
