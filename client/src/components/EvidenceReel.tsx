import { useState, useEffect, useRef } from 'react';
import YouTubePlayer from 'youtube-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faShare,
  faUserSecret,
  faUserNinja,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { EvidenceData } from '../types/evidence';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvidenceCommentsByEvidenceId } from '../api/suspect';
import { useNavigate } from '@tanstack/react-router';
import useModalStore from '../stores/useModalStore';
import ReviewResolutionContent from './Modal/ReviewResolutionContent';
import ReviewResolutionFooter from './Modal/ReviewResolutionFooter';
import { flagEvidenceByUser } from '../api/evidence';
import queryClient from '../helpers/withQueryClient';

type EvidenceProperties = {
  evidence: EvidenceData;
  onVote: (id: string, type: string) => void;
};

const EvidenceReel: React.FC<EvidenceProperties> = ({ evidence, onVote }) => {
  const { toggleModal, setPayload } = useModalStore();
  const navigate = useNavigate();
  const playerReference = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<ReturnType<typeof YouTubePlayer> | null>(null);
  const [isInView, setIsInView] = useState(false);

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['evidenceComments', evidence._id],
    queryFn: () => fetchEvidenceCommentsByEvidenceId(evidence._id),
    enabled: !!evidence._id
  });

  const { mutateAsync } = useMutation({
    mutationFn: flagEvidenceByUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['flaggedEvidences']
      });
      queryClient.setQueryData(['flaggedEvidences'], data);
    },
    onError: (error) => {
      console.error('Error marking evidence', error);
    }
  });

  const videoID = evidence.videoLink
    ? new URL(evidence.videoLink).searchParams.get('v')
    : undefined;

  useEffect(() => {
    if (videoID && isInView) {
      if (!playerInstance.current && playerReference.current) {
        playerInstance.current = YouTubePlayer(playerReference.current);
      }
      if (playerInstance.current) {
        playerInstance.current.loadVideoById(videoID);
        playerInstance.current.playVideo();
      }
    }
  }, [videoID, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );

    if (playerReference.current) {
      observer.observe(playerReference.current);
    }

    return () => {
      if (playerReference.current) {
        observer.unobserve(playerReference.current);
      }
    };
  }, []);

  const amountOfComments = comments?.data?.data?.length ?? 0;

  const toSuspectPage = () => {
    navigate({ to: `/suspect/${evidence.steamId}` });
  };

  const toEvidencePage = () => {
    navigate({ to: `/evidence/${evidence._id}` });
  };

  const toggleResolutionModal = () => {
    setPayload({
      modalHeader: <div className='bg-gray-700 px-8 py-4'>Sentinel Resolution</div>,
      modalContent: <ReviewResolutionContent />,
      modalFooter: <ReviewResolutionFooter />
    });
    toggleModal();
  };

  return (
    <div className='relative w-full h-full flex align-middle' style={{ marginBottom: '200px' }}>
      {videoID && <div style={{ width: '93%', height: '100%' }} ref={playerReference}></div>}
      <div
        className='flex absolute top-0 right-0 p-4 flex-col items-center text-center'
        style={{ zIndex: 1 }}
      >
        <div className='flex flex-col items-center text-center mb-2'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={toggleResolutionModal}
            data-tooltip='Review and vote on evidence'
          >
            <FontAwesomeIcon icon={faUserSecret} />
          </button>
        </div>
        <div className='flex flex-col items-center text-center mb-2'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={toSuspectPage}
            data-tooltip='Suspect'
          >
            <FontAwesomeIcon icon={faUserNinja} />
          </button>
        </div>
        <div className='flex flex-col items-center text-center mb-2'>
          <div className='relative'>
            <button
              disabled={commentsLoading}
              type='button'
              className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center disabled:cursor-not-allowed'
              onClick={toEvidencePage}
              data-tooltip='Comments'
            >
              <FontAwesomeIcon icon={faComment} />
              {amountOfComments > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2'>
                  {amountOfComments}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center text-center mb-2'>
          <button
            disabled={commentsLoading}
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center disabled:cursor-not-allowed'
            onClick={() => {
              return mutateAsync(evidence._id);
            }}
            data-tooltip='Mark as done'
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
        </div>
        <div className='flex flex-col items-center text-center'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={() => onVote(evidence._id, 'share')}
            data-tooltip='Share'
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReel;
