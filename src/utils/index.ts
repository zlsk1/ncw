export const formatPlayCount = (count: number) => {
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

export const judgeJson = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  }
  catch {
    return false
  }
}

export const hideTel = (tel: string) => {
  const reg = /^(\d{3})\d{4}(\d{4})$/
  return tel.replace(reg, '$1****$2')
}

export const hasProfile = () => {
  return !!JSON.parse(localStorage.getItem('userInfo') as string)
}
