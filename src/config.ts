export interface settingType {
  autoplay: boolean,
  index: number,
  lock: boolean,
  mode: 0 | 1 | 2,
  volume: number
}

export const defaultSetting: settingType = {
  autoplay: false,
  index: 0,
  lock: true,
  mode: 0, // 0 =>顺序播放 1 => 随机 2 => 单曲
  volume: 0.8
}