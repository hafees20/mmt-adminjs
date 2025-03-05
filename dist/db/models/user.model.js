import { Model, DataTypes } from 'sequelize';
import sequelize from '../config.js';
class User extends Model {
}
const schema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
};
User.init(schema, { sequelize: sequelize, tableName: 'Users', modelName: 'User' });
export { User };
