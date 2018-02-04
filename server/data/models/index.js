import sequelize from '../sequelize';
// import models here

const sync = (...args) => sequelize.sync(...args);

export default { sync };
