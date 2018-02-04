import DataType from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('user', {
  firstName: {
    type: DataType.STRING,
  },
  lastName: {
    type: DataType.STRING,
  },
});

export default User;
