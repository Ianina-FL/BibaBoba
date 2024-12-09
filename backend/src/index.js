const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const client_addressesRoutes = require('./routes/client_addresses');

const clientsRoutes = require('./routes/clients');

const dish_ingredientsRoutes = require('./routes/dish_ingredients');

const dishesRoutes = require('./routes/dishes');

const dishes_orderedRoutes = require('./routes/dishes_ordered');

const ingredientsRoutes = require('./routes/ingredients');

const ordersRoutes = require('./routes/orders');

const sourcesRoutes = require('./routes/sources');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'BibaBoba',
      description:
        'BibaBoba Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/client_addresses',
  passport.authenticate('jwt', { session: false }),
  client_addressesRoutes,
);

app.use(
  '/api/clients',
  passport.authenticate('jwt', { session: false }),
  clientsRoutes,
);

app.use(
  '/api/dish_ingredients',
  passport.authenticate('jwt', { session: false }),
  dish_ingredientsRoutes,
);

app.use(
  '/api/dishes',
  passport.authenticate('jwt', { session: false }),
  dishesRoutes,
);

app.use(
  '/api/dishes_ordered',
  passport.authenticate('jwt', { session: false }),
  dishes_orderedRoutes,
);

app.use(
  '/api/ingredients',
  passport.authenticate('jwt', { session: false }),
  ingredientsRoutes,
);

app.use(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  ordersRoutes,
);

app.use(
  '/api/sources',
  passport.authenticate('jwt', { session: false }),
  sourcesRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
