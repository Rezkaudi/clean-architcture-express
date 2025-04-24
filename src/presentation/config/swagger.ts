import swaggerJSDoc from 'swagger-jsdoc';

import { CONFIG } from './env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pathway Repository Project API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Pathway Repository Project of SOKA University',
    },
    servers: [
      {
        url: `${CONFIG.SERVER_URL}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuthAccess: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
        cookieAuthRefresh: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  },
  apis: ['src/**/*.swagger.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;