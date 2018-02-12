import sequelize from '../sequelize';
import User from './user';
import Request from './request';
import Ledger from './ledger';
import Active from './active';

const sync = (...args) => {
  sequelize
    .sync(...args)
    .then(() => {
      console.info('Successfully synced database.');
      sequelize.query('DROP TRIGGER IF EXISTS updateActives;').then(() => {
        sequelize
          .query(
            `
          CREATE TRIGGER updateActives
             AFTER INSERT ON LEDGER
             FOR EACH ROW
             BEGIN
               DECLARE x DOUBLE(10,2);
               IF ((NEW.debitUser, NEW.creditUser) IN (
                 SELECT OWED, OWER FROM ACTIVES
               )) THEN
                  UPDATE ACTIVES SET ACTIVES.AMOUNT = ACTIVES.AMOUNT+NEW.AMOUNT, updatedAt=CURRENT_TIMESTAMP WHERE NEW.debitUser = OWED AND NEW.creditUser = OWER;
               ELSEIF ((NEW.DEBITUSER, NEW.CREDITUSER) IN (
                 SELECT OWER, OWED FROM ACTIVES
               )) THEN
                  SET x := (SELECT AMOUNT FROM ACTIVES WHERE NEW.debitUser = OWER AND NEW.creditUser = OWED);
                  IF(x > NEW.AMOUNT) THEN
                    UPDATE ACTIVES SET AMOUNT = AMOUNT-NEW.AMOUNT, updatedAt=CURRENT_TIMESTAMP WHERE NEW.debitUser = OWER AND NEW.creditUser = OWED;
                  ELSEIF (NEW.AMOUNT = x) THEN
                    DELETE FROM ACTIVES WHERE NEW.debitUser = OWER AND NEW.creditUser = OWED;
                  ELSE
                    DELETE FROM ACTIVES WHERE NEW.debitUser = OWER AND NEW.creditUser = OWED;
                    INSERT INTO ACTIVES (OWER,OWED,AMOUNT, createdAt, updatedAt) VALUES(NEW.creditUser, NEW.debitUser, NEW.AMOUNT - x,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
                  END IF;
               ELSE
                  INSERT INTO ACTIVES (OWER, OWED, AMOUNT, createdAt, updatedAt) VALUES (NEW.creditUser, NEW.debitUser,NEW.AMOUNT,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
               END IF;
            END;
          `,
          )
          .then(() => console.log('Trigger created successfully'));
      });
    })
    .catch(err => {
      console.error('Unable to sync database', err);
    });
};

const Model = { sync };

export { User, Request, Ledger, Active };
export default Model;
