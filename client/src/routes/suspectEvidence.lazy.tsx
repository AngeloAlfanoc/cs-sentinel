import { createLazyFileRoute } from '@tanstack/react-router';
import { suspectWithEvidence } from './router';
import { useQuery } from '@tanstack/react-query';
import EvidenceCommentInput from '../components/EvidenceCommentInput';
import EvidenceComments from '../components/EvidenceComments';
import { fetchEvidenceById } from '../api/evidence';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { EvidenceData } from '../types/evidence';

export const suspectEvidenceRoute = createLazyFileRoute(suspectWithEvidence)({
  component: SuspectEvidence
});

function SuspectEvidence() {
  const { evidenceId } = suspectEvidenceRoute.useParams<{
    steamId: string;
    evidenceId: string;
  }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ['evidence', evidenceId],
    queryFn: () => fetchEvidenceById(evidenceId),
    select: (data) => {
      return data;
    }
  });

  if (isLoading) {
    return <div className='text-center text-gray-500'>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className='text-center text-red-500'>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div className='text-center text-gray-500'>No evidence found.</div>;
  }

  const evidence = data.data.data as EvidenceData;

  const videoID = evidence.videoLink
    ? new URL(evidence.videoLink).searchParams.get('v')
    : undefined;

  return (
    <div className='max-w-6xl mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-semibold mb-4'>{evidence.description}</h1>
      {evidence.videoLink && videoID && (
        <div className='mb-4'>
          <LiteYouTubeEmbed id={videoID} title={evidence.description} />
        </div>
      )}
      {evidence.imagesUrls && evidence.imagesUrls.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          {evidence.imagesUrls.map((url: any, index: number) => (
            <img key={index} src={url} alt={`Evidence ${index + 1}`} className='rounded-lg' />
          ))}
        </div>
      )}
      {evidence.demoUrl && (
        <div className='mb-4'>
          <a
            href={evidence.demoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            View Demo
          </a>
        </div>
      )}
      <div className='bg-gray-900 p-4 rounded-lg text-gray-300'>
        <div className='mb-2'>
          <strong>Type:</strong> {evidence.type}
        </div>
        <div className='mb-2'>
          <strong>Description:</strong> {evidence.description}
        </div>
        <div className='mt-4'>
          <EvidenceComments evidenceId={evidence._id} />
          <EvidenceCommentInput evidenceId={evidence._id} />
        </div>
      </div>
    </div>
  );
}
