/* eslint-disable unicorn/consistent-function-scoping */
import { createLazyFileRoute } from '@tanstack/react-router';
import { fetchEvidencesByFlagged } from '../api/evidence';
import EvidenceReel from '../components/EvidenceReel';
import SwipeableViews from 'react-swipeable-views';
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
    queryFn: () => fetchEvidencesByFlagged(),
    select: (data) => {
      return data;
    }
  });

  const [index, setIndex] = useState(0);

  if (isLoading) return <div>{t('loading_evidence')}</div>;
  if (isError) return <div>{`${t('error_occurred')} ${error?.message}`}</div>;

  const handleVote = (id: string, type: string) => {
    console.log(`Voted ${type} on ${id}`);
    return type;
  };

  const handleScroll = throttle((event: React.WheelEvent<HTMLDivElement>) => {
    const operator = event.deltaY / 100;
    const newIndex = index + operator;
    const dataLength = (data?.data.data.length ?? 0);
    if (newIndex > -1 && newIndex < dataLength) {
      setIndex(newIndex);
    }
  }, 500);

  const EvidenceData = data?.data.data as EvidenceData[];

  return (
    <div className='w-full justify-center text-center' onWheel={handleScroll}>
      <div className='w-full flex justify-center mt-12'>
        <div style={{ width: '60%' }}>
          <SwipeableViews
            axis='y'
            enableMouseEvents
            index={index}
            containerStyle={{ height: '60vh' }}
          >
            {EvidenceData.length > 0 ? (
              EvidenceData.map((evidence: EvidenceData) => (
                <div key={evidence._id} style={{ height: '60vh' }}>
                  <EvidenceReel evidence={evidence} onVote={handleVote} />
                </div>
              ))
            ) : (
              <div className='user-select-none'>No evidence to review</div>
            )}
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}
