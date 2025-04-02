import dotenv from 'dotenv';
dotenv.config();
export const ENV = process.env;
export const SuperAdminCredentials = {
    super_username: ENV.SUPER_ADMIN_USERNAME,
    super_password: ENV.SUPER_ADMIN_PASSWORD,
    role: 'admin',
};
export const DB = {
    DB_NAME: ENV.DATABASE_NAME,
    DB_TYPE: ENV.DATABASE_TYPE,
    DB_HOST: ENV.DATABASE_HOST,
    DB_PORT: ENV.DATABASE_PORT,
    DB_USERNAME: ENV.DATABASE_USER,
    DB_PASSWORD: ENV.DATABASE_PASSWORD,
    DB_CON_STR: ENV.DATABASE_URL,
    DB_SYNC: ENV.SYNC_SCHEMA === 'true' || false,
};
export const SESSION = {
    TABLE_NAME: ENV.SESSION_TABLE || 'Session',
    SECRET: ENV.SESSION_SECRET,
    SESSION_NAME: ENV.SESSION_NAME,
    CON_STRING: `${DB.DB_TYPE}://${DB.DB_USERNAME}:${DB.DB_PASSWORD}@${DB.DB_HOST}:${DB.DB_PORT}/${DB.DB_NAME}`,
    SESSION_EXP: ENV.SESSION_EXPIRY || 7 * 24 * 60 * 60 * 1000,
};
export const APP = {
    PORT: ENV.PORT || 3000,
    IS_PROD: ENV.NODE_ENV === 'production',
};
export const COOKIE = {
    NAME: ENV.COOKIE_NAME,
    PASS: ENV.COOKIE_PASSWORD,
    SECRET: ENV.COOKIE_SECRET,
};
