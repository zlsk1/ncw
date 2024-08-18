export interface userPlCountType {
  msg: number,
  code: number,
  comment: number,
  createDJRadioCount: number,
  event: number,
  follow: number,
  forward: number,
  invitationVersion: number,
  battle: {
    endTime: number,
    startTime: number,
    nonStartIcon: any,
    showQuizIcon: boolean,
    startIcon: any,
  },
  friend: {
    celebrityCount: number,
    count: number,
    snsCount: number
  },
  sceneComments: {
    musician_comments: number,
    social_comments: number,
  }
  lastPrivateMsg: any,
  newProgramCount: number,
  newTheme: boolean,
  notice: number,
  pushMsg: any,
  totalComment: number,
  ydAntiUrlConfigVersion: number
}
