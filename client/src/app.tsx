import './scss/global.scss';
import './css/global.css';

import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import withQueryClient from './helpers/withQueryClient';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.querySelector('#app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={withQueryClient}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
