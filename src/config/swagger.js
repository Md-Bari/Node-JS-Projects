const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication & Management API',
      version: '1.0.0',
      description: `
### Simple Node.js & MySQL Authentication System

This API allows you to test:
- **Registration**: \`POST /api/auth/register\`
- **Login**: \`POST /api/auth/login\`
- **Update User**: \`PUT /api/users/{id}\` (Requires Bearer Token)
- **Delete User**: \`DELETE /api/users/{id}\` (Requires Bearer Token)
- **Get Profile**: \`GET /api/users/profile\` (Requires Bearer Token)
- **Get All Users**: \`GET /api/users\` (Requires Bearer Token)

#### 🔑 How to authenticate with Swagger:
1. Register or Login using the **Auth** endpoints below.
2. Copy the \`token\` value from the JSON response.
3. Click the green **Authorize 🔓** button at the top right of this page.
4. Paste your token (the "Bearer" prefix is handled automatically) and click **Authorize**.
5. You can now execute protected endpoints!
      `,
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Express Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token received from /api/auth/login or /api/auth/register',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'User registered successfully' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            data: { $ref: '#/components/schemas/User' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message description' },
          },
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, '../routes/*.js').replace(/\\/g, '/'),
    './src/routes/*.js'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
