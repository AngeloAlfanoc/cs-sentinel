/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import logo from '../assets/logo_w.webp'; // Import the WebP file
import { login } from '../routes/router';
import { useTranslation } from 'react-i18next';

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const routerState = useRouterState();
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate({ to: login });
  };

  useEffect(() => {
    const closeMenu = (event: any) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', closeMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, [isUserMenuOpen]);

  const goTo = (location: string) => {
    navigate({ to: location });
    setIsMenuOpen(false);
  };

  if (routerState.location.pathname !== login && isAuthenticated) {
    return (
      <nav className='p-4 flex justify-between items-center shadow-md bg-gray-800 text-white'>
        <div className='flex items-center'>
          <button className='text-xl md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <img src={logo} alt='Logo' className='h-8' />
          <h1 className='text-xl font-bold hidden md:block ml-2 mr-4'>
            <Link to='/'>{t('app_name')}</Link>
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          <div
            onClick={() => goTo('/submit')}
            className='py-2 px-4 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded text-white hover:cursor-pointer'
          >
            {t('add_submit_evidence')}
          </div>
          <div
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className='user-menu ml-2 flex items-center hover:cursor-pointer'
          >
            <FontAwesomeIcon icon={faUser} />
            <div className='ml-2'>
              <FontAwesomeIcon icon={faSortDown} />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className='absolute top-4 right-4 mt-12 py-2 w-48 bg-gray-800 text-white shadow-lg rounded border border-gray-700 user-menu'>
              <div
                onClick={() => goTo('/profile')}
                className='text-left w-full block px-4 py-2 hover:bg-gray-700  hover:cursor-pointer'
              >
                {t('profile')}
              </div>
              <button
                onClick={() => {
                  goTo('/login');
                  logoutHandler();
                }}
                className='text-left w-full block px-4 py-2 hover:bg-gray-700'
              >
                {t('logout')} <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
