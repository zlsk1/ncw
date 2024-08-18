import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import {
  getSongQueue,
  getCurrentSong,
  getSongIndex,
  getSetting
} from '@/utils/auth'
import { getPlayListDetail } from '@/apis/playList'
import { getSongUrl } from '@/apis/song'
import { ElMessage } from 'element-plus'
import { defaultSetting } from '@/config'
import type { settingType } from '@/config'
import type { playlistTracksType, arType } from '@/types'

export interface songQueueType {
  id: number,
  name: string,
  picUrl: string,
  time?: number,
  url?: string,
  singer?: string,
}

type songQueueIndex = number

export const usePlayStore = defineStore('play', () => {
  const songQueue = ref<songQueueType[]>(getSongQueue())
  const currentSong = ref<songQueueType | undefined>(getCurrentSong())
  const setting = ref<settingType>(getSetting())
  const index = ref<number>(getSongIndex())
  const status = ref(0)

  const actionAddSongs = async(id: number) => {
    try {
      const { data: { playlist: { tracks }}} = await getPlayListDetail(id)
      const idsStr = tracks.map(v => { return v.id }).join(',')
      actionGetSongs(idsStr, tracks)
    }
    catch {
      ElMessage.warning('抱歉，暂无资源')
    }
  }

  // 可处理播放歌手热门歌曲
  const actionGetSongs = async <T>(ids: string, detail: Pick<playlistTracksType, 'name' | 'ar' | 'al'>[] & T) => {
    const songs = await getSongUrl(ids.split(',') as unknown as number)
    if (songs.data.code === -460) ElMessage.error(songs.data.message)
    else {
      const { data: { data }} = songs
      const arr = ids.split(',').map((v, i) => {
        const index = data.findIndex(v1 => Number(v) === v1.id)
        return {
          id: data[index].id,
          url: data[index].url,
          time: data[index].time,
          name: detail[i].name,
          singer: (detail[i].ar as arType[]).length === 1 ? (detail[i].ar as arType).name : (detail[i].ar as arType[]).map(v => { return v.name }).join('/'),
          picUrl: detail[i].al.picUrl
        }
      })
      localStorage.setItem('song_queue', JSON.stringify(arr))
      songQueue.value = arr
      actionUpdateCurrentSong()
    }
  }

  /**
   *
   * @param {*} o 歌曲对象 {id,picUrl,name,singer}
   * @param {*} type =0 插入方式 0为首项即立即播放 1为末项即添加到播放列表
   */
  const actionAddSong = async(o: songQueueType, type = 0) => {
    const res = await getSongUrl(o.id as number)

    if (res.data.code === -460) ElMessage.error(res.data.message)
    else {
      const mergeObj = Object.assign(o, { url: res.data.data[0].url, time: res.data.data[0].time })
      const has = songQueue.value.some(v => v.id === mergeObj.id)
      if (songQueue.value && !has) {
        if (!type) {
          songQueue.value.unshift(mergeObj)
          actionUpdateIndex(0)
        }
        else {
          songQueue.value.push(mergeObj)
        }
        localStorage.setItem('song_queue', JSON.stringify(songQueue.value))
      }
      else if (has && !type) {
        const index = songQueue.value.findIndex(v => v.id === mergeObj.id)
        actionUpdateIndex(index)
      }
      else if (!songQueue.value && !type) {
        songQueue.value = [mergeObj]
        localStorage.setItem('song_queue', JSON.stringify([mergeObj]))
        actionUpdateIndex(0)
      }
      if (!type) {
        actionUpdateCurrentSong()
      }
    }
  }

  const actionDelAll = () => {
    localStorage.setItem('song_queue', JSON.stringify([]))
    songQueue.value = []
    currentSong.value = undefined
    actionUpdateIndex(0)
  }

  const actionDelSong = (i: songQueueIndex) => {
    index.value === songQueue.value.length - 1 ? actionUpdateIndex(--index.value) : ''
    songQueue.value.splice(i, 1)
    localStorage.setItem('song_queue', JSON.stringify(songQueue.value))
  }

  const actionUpdateCurrentSong = () => {
    currentSong.value = localStorage.getItem('song_queue')
      ? JSON.parse(localStorage.getItem('song_queue') as string)[index.value]
      : null
  }

  const actionUpdateSetting = (obj: Partial<settingType>) => {
    Object.assign(setting.value, obj)
    localStorage.setItem('play_setting', JSON.stringify(setting.value))
  }

  const actionUpdateIndex = (i: songQueueIndex) => {
    actionUpdateSetting({ index: i })
    index.value = i
  }

  watch(index, () => {
    actionUpdateCurrentSong()
    document.title = status.value ? currentSong.value?.name as string : '音乐'
  })

  watch(setting, val => {
    if (!val) localStorage.setItem('play_setting', JSON.stringify(defaultSetting))
  })

  watch(status, val => {
    document.title = val ? currentSong.value?.name as string : '音乐'
  })

  return {
    songQueue,
    currentSong,
    index,
    setting,
    status,

    actionAddSongs,
    actionGetSongs,
    actionAddSong,
    actionDelAll,
    actionDelSong,
    actionUpdateCurrentSong,
    actionUpdateIndex,
    actionUpdateSetting
  }
})
