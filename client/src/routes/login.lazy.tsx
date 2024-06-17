import { createLazyFileRoute } from '@tanstack/react-router';
import { LoginForm } from '../components/Forms/LoginForm/LoginForm';
import { SocialLoginButtons } from '../components/Forms/SocialLoginButtons';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/login')({
  component: Login
});

function Login() {
  const { t } = useTranslation();

  return (
    <div className='flex h-screen bg-gray-800 text-white'>
      <div
        className='m-auto w-full max-w-xl p-8 shadow-xl rounded-lg bg-gray-900'
        style={{ transform: 'translateY(-20%)' }}
      >
        <h2 className='text-3xl font-bold mb-6'>{t('login_title')}</h2>
        <LoginForm />
        <SocialLoginButtons />
      </div>
    </div>
  );
}

export default Login;
