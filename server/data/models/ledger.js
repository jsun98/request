import Type from 'sequelize';
import sequelize from '../sequelize';

const Ledger = sequelize.define(
  'Ledger',
  {
    id: {
      primaryKey: true,
      type: Type.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    debitUser: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
    },
    creditUser: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
    },
    amount: {
      type: Type.DOUBLE(10, 2),
      allowNull: false,
    },
    description: {
      type: Type.STRING(140),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: 'Ledger',
  },
);

export default Ledger;
