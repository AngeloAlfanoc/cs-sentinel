import swaggerJsdoc from 'swagger-jsdoc';
import CONFIG from '@/config';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api for CS Sentinel App system',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: 'methods',
        url: 'http://www.methods.digital',
        email: 'info@methods.me',
      },
    },
    servers: [
      {
        url: `http://localhost:${CONFIG.APP.PORT}/api/${CONFIG.APP.VER}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
