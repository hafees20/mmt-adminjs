import { Sequelize } from 'sequelize';
import { APP, DB } from '../constants/constants.js';

const syncOpt = {
  alter: !APP.IS_PROD && DB.DB_SYNC,
  logging: !APP.IS_PROD && DB.DB_SYNC,
};

const sequelize = new Sequelize(DB.DB_CON_STR, {
  dialect: DB.DB_TYPE as any,
  sync: syncOpt,
});

export default sequelize;
