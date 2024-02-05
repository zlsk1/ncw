export const formatPlayCount = count => {
  if (count < 10000) return count
  const a = [10000, 10000 * 10000, 10000 * 100000, 10000 * 1000000]
  const b = ['万', '百万', '千万', '亿']
  let n = 0
  let first = 1
  for (let i = 0; i < a.length; i++) {
    if (count < a[i]) {
      n = i - 1
      first = Math.floor(count / a[n])
      return first + '' + b[n]
    }
  }
}

export const judgeJson = str => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * 防抖
 * @param {Function} fn
 * @param {*} delay 延迟毫秒数
 * @param {*} immediate 是否立即执行,默认立即执行
 */
export function debounce (fn, delay, immediate = true) {
  let timer = null
  return function (...args) {
    if (timer) {
      if (immediate) return
      clearTimeout(timer)
    }
    if (!timer && immediate) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}
