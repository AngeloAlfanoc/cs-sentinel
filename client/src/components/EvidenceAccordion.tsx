/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FunctionComponent, useState, useRef, useEffect } from 'react';

import { fetchEvidenceBySteamId } from '../api/evidence';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import EvidenceComments from './EvidenceComments';
import EvidenceCommentInput from './EvidenceCommentInput';
import { Link } from '@tanstack/react-router';
import YouTubePlayer from 'youtube-player';

// Define types for the evidence data
interface Evidence {
  _id: string;
  description: string;
  type?: string;
  videoLink?: string;
  imagesUrls?: string[];
  demoUrl?: string;
}

interface EvidenceAccordionProperties {
  steamId: string;
}

interface EvidenceItemProperties {
  item: Evidence;
  isOpen: boolean;
  onToggle: () => void;
}

const EvidenceItem: React.FC<EvidenceItemProperties> = ({ item, isOpen, onToggle }) => {
  const playerReference = useRef(null);

  useEffect(() => {
    if (item.videoLink && isOpen) {
      const videoID = new URL(item.videoLink!).searchParams.get('v');
      if (playerReference.current && videoID) {
        const player = YouTubePlayer(playerReference.current);
        player.loadVideoById(videoID);
        player.playVideo();
      }
    }
  }, [isOpen, item.videoLink]);

  if (item.videoLink) {
    const videoID = new URL(item.videoLink!).searchParams.get('v');

    return (
      <div className='border border-gray-700 rounded-lg shadow-md mb-4 bg-gray-800'>
        <h2
          className='bg-gray-700 p-4 cursor-pointer flex justify-between items-center text-white'
          id={`accordion-heading-${item._id}`}
          onClick={onToggle}
          tabIndex={0}
          role='button'
        >
          <div className='flex items-center'>
            <img
              src={`https://img.youtube.com/vi/${videoID}/0.jpg`}
              alt='Thumbnail'
              className='w-32 h-20 mr-3 rounded'
            />
            <span className='font-semibold'>{item.description}</span>
          </div>
          <div>
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
        </h2>
        <div
          id={`accordion-body-${item._id}`}
          className={`transition-max-height duration-500 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
          <div className='p-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='md:col-span-2'>
              {item.videoLink && (
                <div style={{ width: '100%', height: '400px' }} ref={playerReference}></div>
              )}
            </div>
            <div className='bg-gray-900 p-4 rounded-lg text-gray-300'>
              <div className='flex justify-end'>
                <Link
                  to={`/evidence/${item._id}`}
                  className='py-2 px-4 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded text-white'
                >
                  Open Evidence
                </Link>
              </div>
              <div className='mb-2'>
                <strong>Type:</strong> {item.type}
              </div>
              <div className='mb-2'>
                <strong>Description:</strong> {item.description}
              </div>
              <div className='mt-4'>
                <EvidenceComments evidenceId={item._id} />
                <EvidenceCommentInput evidenceId={item._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const EvidenceAccordion: FunctionComponent<EvidenceAccordionProperties> = ({ steamId }) => {
  const {
    data: evidence,
    error,
    isLoading
  } = useQuery({
    queryKey: ['evidence', steamId],
    queryFn: () => fetchEvidenceBySteamId(steamId)
  });

  const [openItemId, setOpenItemId] = useState<string | null>('');

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? '' : id);
  };

  if (isLoading) {
    return <div className='text-center text-gray-500'>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className='text-center text-red-500'>An error occurred: {error.message}</div>;
  }

  return (
    <div id='accordion-collapse' data-accordion='collapse' className='max-w-8xl mx-auto p-4'>
      {evidence.data.data.map((item: Evidence) => (
        <EvidenceItem
          key={item._id}
          item={item}
          isOpen={openItemId === item._id}
          onToggle={() => toggleItem(item._id)}
        />
      ))}
    </div>
  );
};

export default EvidenceAccordion;
