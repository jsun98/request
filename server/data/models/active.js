import Type from 'sequelize';
import sequelize from '../sequelize';

const Active = sequelize.define('Active', {
  ower: {
    primaryKey: true,
    type: Type.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('ower', val.toLowerCase());
    },
  },
  owed: {
    primaryKey: true,
    type: Type.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('owed', val.toLowerCase());
    },
  },
  amount: {
    type: Type.DOUBLE(10, 2),
    allowNull: false,
  },
});

export default Active;
