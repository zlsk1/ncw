import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSongQueue } from '@/utils/auth'
import { getPlayListDetail } from '@/apis/playList'
import { getSongUrl } from '@/apis/song'
import { ElMessage } from 'element-plus'

export const useSongQueueStore = defineStore('songQueue', () => {
  const songQueue = ref(getSongQueue())

  const actionUpdateSongQueue = async id => {
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

  return {
    songQueue,
    actionUpdateSongQueue
  }
})
