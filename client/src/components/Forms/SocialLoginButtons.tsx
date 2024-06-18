import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useLoginAuthentication'; // Replace with your authentication hook
import axios from 'axios'; // Assuming you use Axios for HTTP requests
import { useTranslation } from 'react-i18next';

const oauthConfig = {
  client_id: 'e5f789aa-d5cc-4948-8d44-18e0b067c137', // Your FACEIT client_id
  redirect_uri: 'https://your-app-domain.com/auth/callback', // Replace with your actual redirect URI
  response_type: 'code'
};

export function SocialLoginButtons() {
  const { handleOAuthLogin } = useAuthentication();
  const { t } = useTranslation();

  return (
    <div className='mt-6 flex justify-between items-center'>
      <button
        disabled
        onClick={() => handleOAuthLogin('steam')}
        className='w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {t('login_with_steam')}
      </button>
      <button
        disabled
        onClick={() => handleOAuthLogin('faceit')}
        className='w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {t('login_with_faceit')}
      </button>
    </div>
  );
}
