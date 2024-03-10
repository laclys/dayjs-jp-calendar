import { PluginFunc, Dayjs } from 'dayjs'

/* Eg. 
２０２４年
RRRR　→　令和６年 
RR　→　令和
rrrr →　R6 
rr →　R 
 */
type FormatStr = 'RRRR' | 'RR' | 'rrrr' | 'rr' | string

const format = (str: string, dayjs: Dayjs) => {
  return str.replace(/\[([^\]]+)]|r+|/g, (match) => {
    const date = dayjs.toDate()
    const ret = Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      year: '2-digit',
      era: 'long'
    }).format(date)
    const digitRet = Intl.DateTimeFormat('ja-JP-u-ca-japanese').format(date)
    switch (match) {
      case 'RRRR':
        return ret
      case 'RR':
        return ret.slice(0, 2)
      case 'rrrr':
        return digitRet.slice(0, 2)
      case 'rr':
        return digitRet.slice(0, 1)
      default:
        return match
    }
  })
}

export const jpCalendar: PluginFunc = (_option, dayjsClass, _dayjsFactory) => {
  const oldFormat = dayjsClass.prototype.format
  const proto = dayjsClass.prototype
  proto.format = (template) => {
    const ret = template ? format(template, proto) : template
    return oldFormat.bind(this)(ret)
  }
}

export default jpCalendar
