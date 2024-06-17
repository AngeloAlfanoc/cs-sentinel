import axiosInstance from './api';
import { CommentSubmissionData, CommentSubmissionDataReturnType } from '../types/comment';

export const fetchSuspectCommentsBySteamId = async (
  steamId: string
): Promise<CommentSubmissionDataReturnType[]> => {
  try {
    const response = await axiosInstance.get<CommentSubmissionDataReturnType[]>(
      `/suspect/${steamId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching suspect comments:', error);
    throw error;
  }
};

export const submitSuspectComment = async (
  comment: CommentSubmissionData
): Promise<CommentSubmissionDataReturnType> => {
  try {
    const response = await axiosInstance.post<CommentSubmissionDataReturnType>(
      '/suspect/comments',
      comment
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting suspect comment:', error);
    throw error;
  }
};

export const deleteSuspectCommentByCurrentUser = async (
  commentId: string
): Promise<CommentSubmissionDataReturnType> => {
  try {
    const response = await axiosInstance.delete<CommentSubmissionDataReturnType>(
      `/suspect/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting suspect comment:', error);
    throw error;
  }
};


export const submitEvidenceomment = async (comment: CommentSubmissionData) => {
  try {
    const response = await axiosInstance.post('/evidence/comments', comment);
    return response.data;
  } catch (error) {
    console.error('Error submitting evidence comment:', error);
    throw error;
  }
}