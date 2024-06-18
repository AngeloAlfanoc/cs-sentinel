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
import GenericFooter from './Modal/GenericFooter';
import ReviewResolutionFooter from './Modal/ReviewResolutionFooter';
import { flagEvidenceByUser } from '../api/evidence';
import queryClient from '../helpers/withQueryClient';

type EvidenceProperties = {
  evidence: EvidenceData;
  onVote: (id: string, type: string) => void;
};

const EvidenceReel: React.FC<EvidenceProperties> = ({ evidence, onVote }) => {
  const [playing, setPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toggleModal, setPayload } = useModalStore();
  const navigate = useNavigate();
  const playerReference = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<ReturnType<typeof YouTubePlayer> | null>(null);

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading
  } = useQuery({
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        }
      },
      { threshold: 0.25 }
    );

    if (playerReference.current) {
      observer.observe(playerReference.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && videoID) {
      if (!playerInstance.current && playerReference.current) {
        playerInstance.current = YouTubePlayer(playerReference.current);
      }
      if (playerInstance.current) {
        playerInstance.current.loadVideoById(videoID);
        playerInstance.current.playVideo();
        setPlaying(true);
      }
    }
  }, [isVisible, videoID]);

  const amountOfComments = comments?.data?.data?.length ?? 0;

  const toSuspectPage = () => {
    navigate({ to: `/suspect/${evidence.steamId}` });
  };

  const toggleRelationShipModal = () => {
    setPayload({
      modalHeader: <div className='bg-gray-700 px-8 py-4'>Sentinel Resolution</div>,
      modalContent: <ReviewResolutionContent />,
      modalFooter: <ReviewResolutionFooter />
    });
    toggleModal();
  };

  return (
    <div className='relative w-full h-full'>
      {videoID && <div style={{ width: '86%', height: '86%' }} ref={playerReference}></div>}
      <div
        className='flex absolute top-0 right-0 p-4 flex-col items-center text-center'
        style={{ zIndex: 1 }}
      >
        <div className='flex flex-col mb-2 items-center text-center'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={toggleRelationShipModal}
          >
            <FontAwesomeIcon icon={faUserSecret} />
          </button>
          <span className='text-center mt-1'>Review</span>
        </div>
        <div className='flex flex-col mb-2 items-center text-center'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={toSuspectPage}
          >
            <FontAwesomeIcon icon={faUserNinja} />
          </button>
          <span className='text-center mt-1'>Suspect</span>
        </div>
        <div className='flex flex-col mb-2 items-center text-center'>
          <button
            disabled={commentsLoading}
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center disabled:cursor-not-allowed'
            onClick={() => onVote(evidence._id, 'comment')}
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
          <span className='text-center mt-1'>{amountOfComments}</span>
        </div>
        <div className='flex flex-col mb-2 items-center text-center'>
          <button
            disabled={commentsLoading}
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center disabled:cursor-not-allowed'
            onClick={() => {
              return mutateAsync(evidence._id);
            }}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
          <span className='text-center mt-1'>Mark As Done</span>
        </div>
        <div className='flex flex-col items-center text-center'>
          <button
            type='button'
            className='text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl h-12 w-12 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center'
            onClick={() => onVote(evidence._id, 'share')}
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
          <span className='text-center mt-1'>Delen</span>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReel;
