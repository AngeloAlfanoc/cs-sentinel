import React from 'react';
import { SuspectData } from '../types/suspect';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const SteamProfile = (suspect: SuspectData) => {
  const { t } = useTranslation();
  return (
    <div
      className='flex flex-col items-center w-1/2 p-5 shadow-lg rounded bg-gray-900 bg-blend-lighten opacity-85'
      style={{
        backgroundImage: 'url("/icons/steam_icon.png")',
        backgroundSize: '90% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left bottom',
        backgroundPositionY: '0vh',
        backgroundPositionX: '10vw'
      }}
    >
      <img
        src={suspect?.avatar || '/default-avatar.png'}
        alt='Suspect Avatar'
        className='w-32 h-32'
      />
      <h1 className='text-xl font-bold mt-3'>{suspect?.personaName}</h1>
      <p className='mt-1'>
        <strong>Steam ID:</strong> {suspect?.steamId}
      </p>
      <Link to={suspect?.profileUrl} className='mt-1 text-blue-300 hover:text-blue-700'>
        {t('view_steam_profile')}
      </Link>
    </div>
  );
};

export default SteamProfile;
