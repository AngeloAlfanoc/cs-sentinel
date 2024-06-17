// Adjust the imports based on your actual project structure and dependencies
import { useState, useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type EvidenceProperties = {
  evidence: any;
  onVote: (id: string, type: string) => void;
};

const EvidenceReel: React.FC<EvidenceProperties> = ({ evidence, onVote }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(true);
  }, []);

  const videoID = evidence.videoLink
    ? new URL(evidence.videoLink).searchParams.get('v')
    : undefined;

  return (
    <div className='relative w-full'>
      {videoID && (
        <LiteYouTubeEmbed
          id={videoID}
          title={evidence.description}
          wrapperClass='yt-lite'
          params={playing ? '&mute=1' : ''}
        />
      )}
      <div className='flex absolute top-10 right-0 p-4 flex-col' style={{ zIndex: 1 }}>
        <button
          type='button'
          className='text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          onClick={() => onVote(evidence._id, 'up')}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>

        <button
          type='button'
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          onClick={() => onVote(evidence._id, 'up')}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
};

export default EvidenceReel;
