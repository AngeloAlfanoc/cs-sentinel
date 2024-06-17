import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/about')({
  component: About
});

function About() {
  const { t } = useTranslation();

  return (
    <div className='bg-gray-800 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20'>
      <h1 className='text-2xl font-bold text-white mb-4'>{t('about_title')}</h1>
      <p className='text-md text-white mb-4'>{t('about_paragraph_1')}</p>
      <p className='text-md text-white mb-4'>{t('about_paragraph_2')}</p>
      <p className='text-md text-white mb-4'>{t('about_paragraph_3')}</p>
    </div>
  );
}
