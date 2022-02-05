const swaggerConfig = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Vira Toller API Documentation',
      description: `</br>
          <b>In most cases a success response will be in the following structure</b>
          <pre><code>
            {
              "response": {
                &nbsp;&nbsp;"statusCode": 200,
                &nbsp;&nbsp;"message": "Success",
                &nbsp;&nbsp;"error": false
              },
              "data": []
          </code></pre>`,
    },
    host: `${process.env.HOST}:${process.env.PORT}` || 'localhost:3000',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'auth', description: 'Authentication related end-points' },
      { name: 'users', description: 'User related end-points' },
      { name: 'workspaces', description: 'Workspaces related end-points' },
    ],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
};

module.exports = swaggerConfig;
