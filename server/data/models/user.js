import Type from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
  username: {
    primaryKey: true,
    type: Type.STRING(20),
    allowNull: false,
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
  },
  address: {
    type: Type.STRING,
    allowNull: true,
  },
});

export default User;
