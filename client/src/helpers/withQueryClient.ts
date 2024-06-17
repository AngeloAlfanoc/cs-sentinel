import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          error instanceof Error &&
          error.message.includes('Request failed with status code 500')
        ) {
          return false;
        }
        return failureCount < 1;
      }
    }
  }
});

export default queryClient;
