export type Comment = {
  message: string;
  commentId: string;
  timeStamp: string;
  user: {
    userId: string;
    email: string;
  };
};

export type CommentReturnType = {
  message: string;
  data: Comment[];
};

export type CommentSubmissionData = {
  comment: {
    message: string;
    userId?: string;
    steamId?: string;
  };
};

export type CommentSubmissionDataReturnType = {
  message: string;
};
