import { Model, DataTypes } from 'sequelize';
import sequelize from '../config.js';
import { Location } from './location.model.js';
class Member extends Model {
}
const schema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    houseName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    familyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postOffice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wardNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    houseNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    aadhaarNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [12, 12],
        },
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 10],
        },
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 10],
        },
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    localBody: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    madrasaEducation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monthlyIncome: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bloodGroup: {
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
        allowNull: false,
    },
    maritalStatus: {
        type: DataTypes.ENUM('single', 'married', 'divorced', 'widowed'),
        allowNull: false,
    },
};
Member.init(schema, { sequelize, tableName: 'Members', modelName: 'Member' });
Member.hasOne(Location, { foreignKey: 'membership_id', onDelete: 'CASCADE' });
Location.belongsTo(Member, { foreignKey: 'membership_id' });
export { Member };
