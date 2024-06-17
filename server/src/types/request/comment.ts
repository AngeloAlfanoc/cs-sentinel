export type DataComment = {
  id: string;
  timestamp: string;
} & Comment;

export type Comment = {
  message: string;
  userId: string;
  steamId: string;
  timeStamp: Date;
  evidenceId?: string;
};
