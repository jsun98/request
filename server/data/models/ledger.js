import Type from 'sequelize';
import sequelize from '../sequelize';

const Ledger = sequelize.define('Ledger', {
  id: {
    primaryKey: true,
    type: Type.INTEGER,
    allowNull: false,
  },
  date: {
    type: Type.DATE,

  },
  debit_user: {
    primaryKey: true,
    type: Type.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('debit_user', val.toLowerCase());
    },
  },
  credit_user: {
    primaryKey: true,
    type: Type.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('credit_user', val.toLowerCase());
    },
  },
  amount: {
    type: Type.DOUBLE(10,2),
    allowNull: false,
  },
},
{
  freezeTableName: true,
  tableName: 'Ledger'
});

export default Ledger;
