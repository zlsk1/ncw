import type { PropType } from 'vue'

export type dynamicType = {
  bookedCount?: number,
  shareCount: number,
  commentCount: number,
}

export const btnsProps = {
  dynamic: Object as PropType<dynamicType>,
  id: {
    type: Number,
    default: 0,
    required: true
  }
}
