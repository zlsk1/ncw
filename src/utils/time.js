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
  if (typeof (t) === 'string') return '00:00'
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
