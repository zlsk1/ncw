import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getSongQueue, getCurrentSong, getSongIndex, getSetting } from '@/utils/auth'
import { getPlayListDetail } from '@/apis/playList'
import { getSongUrl } from '@/apis/song'
import { ElMessage } from 'element-plus'
import { defaultSetting } from '@/cogfig'

export const usePlayStore = defineStore('play', () => {
  const songQueue = ref(getSongQueue())
  const currentSong = ref(getCurrentSong())
  const index = ref(getSongIndex())
  const setting = ref(getSetting())

  const actionAddSongs = async id => {
    const { data: { playlist: { tracks }}} = await getPlayListDetail(id)
    const idsStr = tracks.map(v => { return v.id }).join(',')
    const songs = await getSongUrl(idsStr)
    if (songs.data.code === -460) ElMessage.error(songs.data.message)
    else {
      const { data: { data }} = songs
      const arr = idsStr.split(',').map((v, i) => {
        const index = data.findIndex(v1 => Number(v) === v1.id)
        return {
          id: data[index].id,
          url: data[index].url,
          time: data[index].time,
          name: tracks[i].al.name,
          singer: tracks[i].ar.length === 1 ? tracks[i].ar[0].name : tracks[i].ar.map(v => { return v.name }).join('/'),
          picUrl: tracks[i].al.picUrl
        }
      })
      localStorage.setItem('song_queue', JSON.stringify(arr))
      songQueue.value = arr
    }
  }

  /**
   *
   * @param {*} o 歌曲对象 {id,picUrl,name,singer}
   * @param {*} type =0 插入方式 0为首项即立即播放 1为末项即添加到播放列表
   */
  const actionAddSong = async (o, type = 0) => {
    const res = await getSongUrl(o.id)
    if (res.data.code === -460) ElMessage.error(res.data.message)
    else {
      const mergeObj = Object.assign(o, { url: res.data.data[0].url, time: res.data.data[0].time })
      const has = songQueue.value.some(v => v.id === mergeObj.id)
      if (songQueue.value && !has) {
        if (!type) {
          songQueue.value.unshift(mergeObj)
          actionUpdateIndex(0)
        } else {
          songQueue.value.push(mergeObj)
        }
        localStorage.setItem('song_queue', JSON.stringify(songQueue.value))
      } else if (has && !type) {
        const index = songQueue.value.findIndex(v => v.id === mergeObj.id)
        actionUpdateIndex(index)
      } else if (!songQueue.value && !type) {
        songQueue.value = [mergeObj]
        localStorage.setItem('song_queue', JSON.stringify([mergeObj]))
        actionUpdateIndex(0)
      }
      if (!type) {
        actionUpdateCurrentSong()
      }
    }
  }

  const actionDelAll = i => {
    localStorage.setItem('song_queue', JSON.stringify([]))
    songQueue.value = []
    // currentSong.value = undefined
    actionUpdateIndex(0)
  }

  const actionDelSong = i => {
    index.value === songQueue.value.length - 1 ? actionUpdateIndex(--index.value) : ''
    songQueue.value.splice(i, 1)
    localStorage.setItem('song_queue', JSON.stringify(songQueue.value))
  }

  const actionUpdateCurrentSong = () => {
    currentSong.value = localStorage.getItem('song_queue')
      ? JSON.parse(localStorage.getItem('song_queue'))[getSongIndex()]
      : null
  }

  const actionUpdateSetting = (obj) => {
    Object.assign(setting.value, obj)
    localStorage.setItem('play_setting', JSON.stringify(setting.value))
  }

  const actionUpdateIndex = i => {
    actionUpdateSetting({ index: i })
    index.value = i
  }

  watch(index, () => {
    actionUpdateCurrentSong()
  })

  watch(setting, val => {
    if (!val) localStorage.setItem('play_setting', JSON.stringify(defaultSetting))
  })

  return {
    songQueue,
    currentSong,
    index,
    setting,
    actionAddSongs,
    actionAddSong,
    actionDelAll,
    actionDelSong,
    actionUpdateCurrentSong,
    actionUpdateIndex,
    actionUpdateSetting
  }
})
