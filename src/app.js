const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'User Auth API Docs',
  swaggerOptions: {
    persistAuthorization: true,
  }
}));

// Welcome / health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Node.js & MySQL Auth System API',
    swaggerDocs: 'http://localhost:' + (process.env.PORT || 5000) + '/api-docs',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      users: {
        profile: 'GET /api/users/profile (Protected)',
        list: 'GET /api/users (Protected)',
        update: 'PUT /api/users/:id (Protected)',
        delete: 'DELETE /api/users/:id (Protected)'
      }
    }
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
