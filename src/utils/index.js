export const formatPlayCount = count => {
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
