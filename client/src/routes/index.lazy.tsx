/* eslint-disable unicorn/consistent-function-scoping */
import { createLazyFileRoute } from '@tanstack/react-router';
import { fetchEvidencesByFlagged } from '../api/evidence';
import EvidenceReel from '../components/EvidenceReel';
import { useState } from 'react';
import { EvidenceData } from '../types/evidence';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { throttle } from 'lodash';

export const Route = createLazyFileRoute('/')({
  component: Index
});

function Index() {
  const { t } = useTranslation();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['flaggedEvidences'],
    queryFn: fetchEvidencesByFlagged,
    select: (data) => data
  });

  const [index, setIndex] = useState(0);

  if (isLoading) return <div>{t('loading_evidence')}</div>;
  if (isError) return <div>{`${t('error_occurred')} ${error?.message}`}</div>;

  const handleScroll = throttle((event: React.WheelEvent<HTMLDivElement>) => {
    const operator = event.deltaY / 100;
    const newIndex = index + operator;
    const dataLength = data?.data.data.length ?? 0;
    if (newIndex > -1 && newIndex < dataLength) {
      setIndex(newIndex);
    }
  }, 500);

  const evidenceData = data?.data.data as EvidenceData[];

  return (
    <div className='w-full flex justify-center text-center' onWheel={handleScroll}>
      <div className='w-full flex justify-center mt-12'>
        <div style={{ width: '85%' }}>
          {evidenceData.length > 0 ? (
            evidenceData.map((evidence: EvidenceData) => (
              <div key={evidence._id} style={{ height: '100vh' }} className='w-full flex flex-col'>
                <div className='text-white text-3xl font-bold flex justify-start'>
                  <h2>{evidence.name}</h2>
                </div>
                <EvidenceReel evidence={evidence} />
              </div>
            ))
          ) : (
            <div className='user-select-none'>{t('no_evidence_to_review')}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
