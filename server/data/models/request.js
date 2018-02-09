import Type from 'sequelize';
import sequelize from '../sequelize';

const Request = sequelize.define('Request', {
  id: {
    primaryKey: true,
    type: Type.INTEGER,
    allowNull: false,
  },
  sender: {
    type: Type.STRING(20),
    allowNull: false,
  },
  receiver: {
    type: Type.STRING(20),
    allowNull: false,
  },
  amount: {
    type: Type.DECIMAL,
    allowNull: false,
  },
  description: {
    type: Type.STRING(140),
    allowNull: true,
  },
});

export default Request;
