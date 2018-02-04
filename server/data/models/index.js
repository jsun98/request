import sequelize from '../sequelize';
// import models here

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
