import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import * as url from 'url';
import path from 'path';
import * as AdminJSSequelize from '@adminjs/sequelize';
import session from 'express-session';
import { APP, COOKIE, SESSION } from './constants/constants.js';
import connectPgSimple from 'connect-pg-simple';
import pg from 'pg';

const { Pool } = pg;

const port = APP.PORT;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const start = async () => {
  const app = express();

  await initializeDb();

  const pgPool = new Pool({
    connectionString: SESSION.CON_STRING,
    ssl: APP.IS_PROD,
  });

  const SessionStore = connectPgSimple(session);

  const sessionStore = new SessionStore({
    pool: pgPool,
    tableName: SESSION.TABLE_NAME,
    createTableIfMissing: !APP.IS_PROD,
  });

  app.use(
    session({
      store: sessionStore,
      resave: !APP.IS_PROD,
      saveUninitialized: !APP.IS_PROD,
      secret: SESSION.SECRET,
      cookie: {
        httpOnly: APP.IS_PROD,
        secure: APP.IS_PROD,
        maxAge: +SESSION.SESSION_EXP,
      },
      name: SESSION.SESSION_NAME,
    })
  );

  const admin = new AdminJS(options);

  if (APP.IS_PROD) {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: COOKIE.PASS,
      cookieName: COOKIE.NAME,
      provider,
    },
    null,
    {
      secret: COOKIE.SECRET,
      saveUninitialized: !APP.IS_PROD,
      resave: !APP.IS_PROD,
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
