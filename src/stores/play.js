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

  const actionAddSong = async o => {
    const res = await getSongUrl(o.id)
    if (res.data.code === -460) ElMessage.error(res.data.message)
    else {
      const mergeObj = Object.assign(o, { url: res.data.data[0].url, time: res.data.data[0].time })
      if (songQueue.value && !songQueue.value.some(v => v.id === mergeObj.id)) {
        songQueue.value.unshift(mergeObj)
        localStorage.setItem('song_queue', JSON.stringify(songQueue.value))
        actionUpdateIndex(0)
      }
      if (!songQueue.value) {
        songQueue.value = [mergeObj]
        localStorage.setItem('song_queue', JSON.stringify([mergeObj]))
      }
      actionUpdateCurrentSong()
    }
  }

  const actionDelAll = i => {
    localStorage.setItem('song_queue', JSON.stringify([]))
    songQueue.value = []
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

  watch(index, val => {
    actionUpdateCurrentSong()
  })

  watch(setting, val => {
    if (val) localStorage.setItem('play_setting', JSON.stringify(defaultSetting))
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
