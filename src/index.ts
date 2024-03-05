import { PluginFunc } from 'dayjs'

/* Eg. 
２０２４年
RRRR　→　令和６年 
RR　→　令和
rrrr →　R06 
rr →　R 
 */
type FormatStr = 'RRRR' | 'RR' | 'rrrr' | 'rr' | string

const format = (str: string) => {
  str.replace(/\[([^\]]+)]|r+|/g, (match) => {
    switch (match) {
      case 'RRRR':
        return ''
      case 'RR':
        return ''
      case 'rrrr':
        return ''
      case 'rr':
        return ''
      default:
        return match
    }
  })
}

export const jpCalendar: PluginFunc = (_option, dayjsClass, _dayjsFactory) => {
  const oldFormat = dayjsClass.prototype.format

  dayjsClass.prototype.format = (template) => {
    const ret = template ? format(template) : template
    return oldFormat.bind(this)(ret)
  }
}

export default jpCalendar
