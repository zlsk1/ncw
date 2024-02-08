export const getTimestamp = () => {
  return Date.now()
}

/**
 *
 * @param {String || Number} t
 * @param {Number} type 0为ms 1为s
 * @returns '00:00'
 */
export const formatSongDuration = (t, type) => {
  if (typeof (t) === 'string' || typeof (t) === 'undefined') return '00:00'
  const arr = [1000, 1000 * 60, 1000 * 60 * 60]
  let m, s
  if (type === 0) {
    if (t < arr[1]) {
      s = Math.floor(t / arr[0])
      s.toString().length === 1 ? s = s.toString().padStart(2, '0') : s
      return `00:${s}`
    } else if (t < arr[2]) {
      m = Math.floor(t / arr[1])
      s = Math.floor(t / 1000 % 60)
      m = m.toString().length === 1 ? m = m.toString().padStart(2, '0') : m
      s = s.toString().length === 1 ? s = s.toString().padStart(2, '0') : s
      return `${m}:${s}`
    }
  } else if (type === 1) {
    if (t < 60) {
      s = Math.floor(t).toString().length === 1 ? Math.floor(t).toString().padStart(2, '0') : Math.floor(t)
      return `00:${s}`
    } else if (t > 60 || t < 3600) {
      m = Math.floor(t / 60)
      s = Math.floor(t % 60)
      s = s.toString().length === 1 ? s.toString().padStart(2, '0') : s
      m = m.toString().length === 1 ? m = m.toString().padStart(2, '0') : m
      return `${m}:${s}`
    }
  }
}

/**
 * 评论时间戳转化为 ‘1月20日 00:00’ 或 '2024年1月20日'
 * @param {*} stamp
 * @returns
 */
export const formatTimeStamp = (stamp) => {
  const date = new Date()
  const t = new Date(stamp).toLocaleString()
  const a = t.split(' ')[0]
  // const b = t.split(' ')[1]
  const y = a.split('/')
  // const h = b.split('-')
  if (Number(y[0]) < date.getFullYear()) {
    return `${y[0]}年${y[1]}月${y[2]}日`
  } else if (Number(y[0]) === date.getFullYear()) {
    return `${y[1]}月${y[2]}日 ${t.split(' ')[1].substring(0, 5)}`
  }
}

export const isBeforeYesterday = (stamp) => {
  const nowDay = new Date().getDate()
  const d = new Date(stamp).toLocaleString().split(' ')[0].split('/')[2]
  if (nowDay - d < 2) return true
  else return false
}

/**
 * 时间戳转化为 例 02日01月
 * @param {*} stamp
 * @returns
 */
export const formatMonthDay = (stamp) => {
  const m = (new Date(stamp).getMonth() + 1).toString().padStart(2, '0')
  const d = new Date(stamp).getDate().toString().padStart(2, '0')
  return `${m}月${d}日`
}

/**
 *
 * @param {*} stamp
 * @returns 23-06-06 15:27
 */
export const formatMsgTime = stamp => {
  const t = new Date(stamp).toLocaleString()
  const front = t.split(' ')[0].split('/')
  const end = t.split(' ')[1].slice(0, 5)
  const year_ = front[0].slice(-2) + '-' + front[1].padStart(2, '0') + '-' + front[1].padStart(2, '0')
  return year_ + ' ' + end
}
