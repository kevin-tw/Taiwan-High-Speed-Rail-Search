import moment from 'moment'
import 'moment/locale/zh-cn'

const diffTime = (time1, time2, formatStr) => {
  const diff = moment.utc(moment(time1, 'HH:mm').diff(moment(time2, 'HH:mm')))

  return formatStr ? diff.format(formatStr) : diff
}

const getNowDate = formatStr => formatStr ? moment().format(formatStr) : moment()

export {
  diffTime,
  getNowDate,
}
