import 'module-alias/register'; // This replaces the require call for module-alias
import { createApp } from './app';
import { startServer } from './server';

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      const app = await createApp();
      startServer(app);
    } catch (error) {
      console.error('Failed to start the application', error);
      process.exit(1); // Exit with failure code
    }
  }
})();
