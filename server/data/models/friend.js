import Type from 'sequelize';
import sequelize from '../sequelize';

const Friend = sequelize.define(
  'Friend',
  {
    user_1: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
    },
    user_2: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
    },
    status: {
      type: Type.INTEGER,
      allowNull: false,
    },
    action_user: {
      type: Type.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'Friend',
  },
);

export default Friend;
