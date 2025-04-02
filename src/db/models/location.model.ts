import { UUID } from 'crypto';
import {
  Model,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ModelAttributes,
  Optional,
  NonAttribute,
  Association,
} from 'sequelize';
import { Member } from './membership.model.js';
import sequelize from '../config.js';

class Location extends Model<InferCreationAttributes<Location>> {
  declare id: CreationOptional<UUID>;
  declare membership_id: UUID;
  declare geog: { type: 'Point'; coordinates: [number, number] };

  // Define the association with Member
  declare Member?: NonAttribute<Member>; // Use NonAttribute to indicate this is not a database column

  // Declare static associations
  declare static associations: {
    Member: Association<Location, Member>;
  };
}

const schema: ModelAttributes<Location, Optional<InferCreationAttributes<Location, { omit: never }>, never>> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  membership_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  geog: {
    type: DataTypes.GEOGRAPHY('POINT', 4326), // PostGIS Point type with SRID 4326
    allowNull: false,
  },
};

Location.init(schema, { sequelize: sequelize, tableName: 'Locations', modelName: 'Location' });

export { Location };
