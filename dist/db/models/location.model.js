import { Model, DataTypes, } from 'sequelize';
import sequelize from '../config.js';
class Location extends Model {
}
const schema = {
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
        type: DataTypes.GEOGRAPHY('POINT', 4326),
        allowNull: false,
    },
};
Location.init(schema, { sequelize: sequelize, tableName: 'Locations', modelName: 'Location' });
export { Location };
