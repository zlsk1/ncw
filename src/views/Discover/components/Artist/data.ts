const catelist = [
  {
    area: '推荐',
    type: ['热门歌手'],
    path: ['/discover/artist']
  },
  {
    area: '华语',
    type: ['男歌手', '女歌手', '组合/乐队'],
    path: ['/discover/artist/cate?area=华语&type=男歌手', '/discover/artist/cate?area=华语&type=女歌手', '/discover/artist/cate?area=华语&type=组合/乐队']
  },
  {
    area: '欧美',
    type: ['男歌手', '女歌手', '组合/乐队'],
    path: ['/discover/artist/cate?area=欧美&type=男歌手', '/discover/artist/cate?area=欧美&type=女歌手', '/discover/artist/cate?area=欧美&type=组合/乐队']
  },
  {
    area: '日本',
    type: ['男歌手', '女歌手', '组合/乐队'],
    path: ['/discover/artist/cate?area=日本&type=男歌手', '/discover/artist/cate?area=日本&type=女歌手', '/discover/artist/cate?area=日本&type=组合/乐队']
  },
  {
    area: '韩国',
    type: ['男歌手', '女歌手', '组合/乐队'],
    path: ['/discover/artist/cate?area=韩国&type=男歌手', '/discover/artist/cate?area=韩国&type=女歌手', '/discover/artist/cate?area=韩国&type=组合/乐队']
  },
  {
    area: '其他',
    type: ['男歌手', '女歌手', '组合/乐队'],
    path: ['/discover/artist/cate?area=其他&type=男歌手', '/discover/artist/cate?area=其他&type=女歌手', '/discover/artist/cate?area=其他&type=组合/乐队']
  }
]

const filterlist = ['-1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0']

const typeObj = {
  '男歌手': 1,
  '女歌手': 2,
  '组合/乐队': 3,
  '全部': -1
}

const areaObj = {
  '全部': -1,
  '华语': 7,
  '欧美': 96,
  '日本': 8,
  '韩国': 16,
  '其他': 0
}

export {
  catelist,
  filterlist,
  typeObj,
  areaObj
}
