import http from '@/utils/http'

/**
 *
 * @param {*} id 歌单id
 * @param {*} s 歌单最近的s个收藏者
 * @returns 歌单详情 al.name为专辑名称 ar为歌手信息
 */
export const getPlayListDetail = (id, s) => {
  return http({
    url: '/playlist/detail',
    params: {
      id,
      s
    }
  })
}

/**
 * 获取对应歌单的所有歌曲
 * @param {*} id
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export const getPlayListAllAPI = ({ id, limit, offset }) => {
  return http({
    url: '/playlist/track/all',
    params: {
      id,
      limit,
      offset
    }
  })
}

/**
 * 获取歌单动态信息 如评论数,是否收藏,播放数
 * @param {*} id
 * @returns
 */
export const getPlaylistDynamicAPI = id => {
  return http({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}

/**
 * 获取相关歌单
 * @param {*} id
 * @returns
 */
export const getRelatedPlaylistAPI = id => {
  return http({
    url: '/related/playlist'
  })
}

/**
 * 获取歌单分类,包含 category 信息
 * @returns
 */
export const getPlaylistCateAPI = () => {
  return http({
    url: '/playlist/catlist'
  })
}

/**
 * 获取精品歌单分类,包含 category 信息
 * @returns
 */
export const getPlaylistHighCateAPI = () => {
  return http({
    url: '/playlist/highquality/tags'
  })
}

/**
 * 获取精品歌单
 * @param {*} cat 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @param {*} limit 取出歌单数量 , 默认为 50
 * @param {*} before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @returns
 */
export const getTopPlaylistHighAPI = ({ cat, limit, before }) => {
  return http({
    url: '/top/playlist/highquality',
    params: {
      cat,
      limit,
      before
    }
  })
}

/**
 * 获取所有歌单
 * @param {*} order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param {*} cat 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @param {*} limit 取出歌单数量 , 默认为 50
 * @param {*} offset 偏移数量
 * @returns
 */
export const getAllPlaylistAPI = ({ order, cat, limit, offset }) => {
  return http({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}

