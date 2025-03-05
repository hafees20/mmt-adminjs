import dotenv from 'dotenv';
dotenv.config();
export const SuperAdminCredentials = {
    super_username: process.env.SUPER_ADMIN_USERNAME,
    super_password: process.env.SUPER_ADMIN_PASSWORD,
    role: 'superadmin',
};
export const DB = {
    DB_NAME: process.env.DATABASE_DIALECT,
    DB_TYPE: process.env.DATABASE_TYPE || 'postgres',
    DB_HOST: process.env.DATABASE_HOST || 'localhost',
    DB_PORT: process.env.DATABASE_PORT,
    DB_USERNAME: process.env.DATABASE_USER || 'username',
    DB_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
};
export const SESSION = {
    TABLE_NAME: 'session',
    SECRET: process.env.SESSION_SECRET,
    SESSION_NAME: process.env.SESSION_NAME,
    CON_STRING: `${DB.DB_TYPE}://${DB.DB_USERNAME}:${DB.DB_PASSWORD}@${DB.DB_HOST}:${DB.DB_PORT}/${DB.DB_NAME}`,
};
export const APP = {
    PORT: process.env.PORT,
};
export const COOKIE = {
    NAME: process.env.COOKIE_NAME,
    PASS: process.env.COOKIE_PASSWORD,
};
