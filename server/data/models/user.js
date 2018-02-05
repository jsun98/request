import Type from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
  username: {
    primaryKey: true,
    type: Type.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('username', val.toLowerCase());
    },
  },
  firstname: {
    type: Type.STRING,
    allowNull: false,
  },
  lastname: {
    type: Type.STRING,
    allowNull: false,
  },
  password: {
    type: Type.STRING,
    allowNull: false,
    set(val) {
      // this is where the hashing should occur
      this.setDataValue('password', val.toLowerCase());
    },
  },
  address: {
    type: Type.STRING,
    allowNull: true,
  },
});

export default User;
