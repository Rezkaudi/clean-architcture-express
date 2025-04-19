import swaggerJSDoc from 'swagger-jsdoc';

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
        url: `${process.env.SERVER_URL}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.ts', './src/application/dtos/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;