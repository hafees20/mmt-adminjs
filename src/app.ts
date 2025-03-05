import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import * as url from 'url';
import path from 'path';
import * as AdminJSSequelize from '@adminjs/sequelize';
import Connect from 'connect-pg-simple';
import session from 'express-session';
import { SESSION } from './constants/constants.js';

const port = process.env.PORT || 3000;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const start = async () => {
  const app = express();

  await initializeDb();

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: SESSION.CON_STRING,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: SESSION.TABLE_NAME,
    createTableIfMissing: true,
  });

  app.use(
    session({
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: SESSION.SECRET,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: SESSION.SESSION_NAME,
    })
  );
  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  // Convert import.meta.url to __dirname equivalent in ESM
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the "public" directory
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
