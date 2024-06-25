import React from 'react';
import { fetchEvidenceCommentsByEvidenceId } from '../api/suspect';
import { useMutation, useQuery } from '@tanstack/react-query';
import queryClient from '../helpers/withQueryClient';
import { deleteSuspectCommentByCurrentUser } from '../api/comment';
import { Comment } from '../types/comment';
import useAuthStore from '../stores/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
type Properties = {
  evidenceId: string;
};

const EvidenceComments: React.FC<Properties> = ({ evidenceId }) => {
  const { user } = useAuthStore();
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading
  } = useQuery({
    queryKey: ['evidenceComments', evidenceId],
    queryFn: () => fetchEvidenceCommentsByEvidenceId(evidenceId),
    enabled: !!evidenceId
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteSuspectCommentByCurrentUser,
    onSuccess: (data) => {
      console.log('Comment successfully deleted', data);
      queryClient.invalidateQueries({
        queryKey: ['evidenceComments', evidenceId]
      });
    },
    onError: (error) => {
      console.error('Error submitting comment:', error);
    }
  });

  const handleDelete = async (commentId: string) => {
    await mutateAsync(commentId);
  };

  if (commentsLoading) return <div>Loading...</div>;
  if (commentsError instanceof Error)
    return <div>There was problem showing comments: {commentsError.message}</div>;
  if (comments?.data.data.length === 0) return <div>No comments yet. Be the first to comment!</div>;

  return (
    <div className='bg-gray-800 p-4 rounded-lg shadow space-y-3 max-h-96 overflow-y-auto'>
      {comments.data.data.map((comment: Comment) => (
        <div key={comment.commentId} className='bg-gray-700 p-3 rounded-lg shadow'>
          <div className='flex items-center justify-between text-sm text-gray-400'>
            <h5 className='font-bold text-gray-300'>{comment.user.email}</h5>
            <div className='flex items-center'>
              <span className='text-gray-500 mr-2'>{comment.timeStamp}</span>
              {user?.user?.id === comment.user.userId && (
                <button onClick={() => handleDelete(comment.commentId)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
          <p className='mt-1 text-gray-200'>{comment.message}</p>
        </div>
      ))}
    </div>
  );
};

export default EvidenceComments;
