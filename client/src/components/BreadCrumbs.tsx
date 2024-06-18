// src/Breadcrumbs.tsx
import { Link, useRouterState } from '@tanstack/react-router';
import React, { useEffect } from 'react';
import useBreadcrumbsStore from '../stores/useBreadcrumsStore';

const Breadcrumbs: React.FC = () => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbsStore();
  const routerState = useRouterState();

  useEffect(() => {
    if (routerState && routerState.matches) {
      const newBreadcrumbs = routerState.matches.slice(1).map((match) => ({
        label: match.routeId.replace('/$', ''),
        href: match.pathname
      }));
      setBreadcrumbs(newBreadcrumbs);
    }
  }, [routerState, setBreadcrumbs]);

  return (
    <nav className='bg-gray-800 p-4 shadow-md rounded-md'>
      <ol className='list-reset flex text-gray-300'>
        {breadcrumbs.map((path, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className='mx-2 text-gray-500'>/</span>}
            {index < breadcrumbs.length - 1 ? (
              <li>
                <Link to={path.href} className='text-blue-400 hover:text-blue-600'>
                  {path.label}
                </Link>
              </li>
            ) : (
              <li className='text-gray-100'>{path.label}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
