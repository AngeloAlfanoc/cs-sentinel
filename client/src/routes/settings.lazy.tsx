import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/settings')({
  component: Settings
});

function Settings() {
  const { t } = useTranslation();

  return <div className='bg-gray-800 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20'>{t('my_settings')}</div>;
}
