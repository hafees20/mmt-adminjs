import { UUID } from 'crypto';
import { Model, InferCreationAttributes, CreationOptional, DataTypes, ModelAttributes, Optional } from 'sequelize';
import sequelize from '../config.js';

class User extends Model<InferCreationAttributes<User>> {
  declare id: CreationOptional<UUID>;
  declare name: string;
  declare email: string;
  declare password: string;
}

const schema: ModelAttributes<User, Optional<InferCreationAttributes<User, { omit: never }>, never>> = {
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
