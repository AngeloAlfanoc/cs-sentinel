import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { fetchSuspects } from '../api/suspect';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { suspects } from './router';
import { SuspectData } from '../types/suspect';

export const Route = createLazyFileRoute(suspects)({
  component: Suspects
});

function Suspects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: suspects,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['suspects'],
    queryFn: () => fetchSuspects(),
    select: (data) => data
  });

  if (isLoading) return <div className='text-white'>{t('loading_suspects')}</div>;
  if (isError)
    return (
      <div className='text-red-500'>{`${t('suspects_error_occurred')} ${error?.message}`}</div>
    );

  const handleRowClick = (steamId: string) => {
    navigate({ to: `/suspect/${steamId}` });
  };

  const suspectsData = suspects?.data as SuspectData[];

  return (
    <div className='flex flex-col p-4'>
      <table className='min-w-full bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-900 text-white'>
          <tr>
            <th className='text-left px-4 py-2 w-40 border-b border-gray-700'>{t('name')}</th>
            <th className='text-left px-4 py-2 w-40 border-b border-gray-700'>{t('links')}</th>
            <th className='text-left px-4 py-2 w-40 border-b border-gray-700'>{t('evidences')}</th>
            <th className='text-right px-4 py-2 border-b border-gray-700'></th>
          </tr>
        </thead>
        <tbody className='bg-gray-700'>
          {suspectsData.length > 0 ? (
            suspectsData.map((suspect) => (
              <tr
                key={suspect.suspectId}
                onClick={() => handleRowClick(suspect.steamId)}
                className='hover:bg-gray-600 cursor-pointer transition-colors'
              >
                <td className='px-4 py-2 border-b border-gray-600'>{suspect.personaName}</td>
                <td className='px-4 py-2 border-b border-gray-600'>
                  <div className='flex items-center space-x-2'>
                    <img
                      src='/icons/steam_icon.png'
                      alt='Steam Icon'
                      width={24}
                      className='inline'
                    />
                    {suspect.links.map((link) => (
                      <img
                        key={link.linkId}
                        src={`/icons/${link.type.toLowerCase()}_icon.png`}
                        alt={link.type}
                        width={24}
                        className='inline'
                      />
                    ))}
                  </div>
                </td>
                <td className='px-4 py-2 border-b border-gray-600 text-center'>
                  {suspect.evidence.length}
                </td>
                <td className='px-4 py-2 border-b border-gray-600 text-right text-indigo-400'>
                  {t('go_to_suspect')}
                </td>
              </tr>
            ))
          ) : (
            <tr className='hover:bg-gray-600 cursor-pointer transition-colors'>
              <td colSpan={4} className='text-center py-4'>
                No Results
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
