import { Router } from 'express';

import login from './login';
import signup from './signup';
import profile from './profile';
import sequelize from  '../data/sequelize';

const router = Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/profile', profile);

router.get('/', (req, res) => {
  sequelize.query(`
  CREATE TRIGGER isActive
     AFTER INSERT ON LEDGER
     FOR EACH ROW
     BEGIN
       DECLARE x DOUBLE(10,2);
       IF ((NEW.DEBIT_USER, NEW.CREDIT_USER) IN (
         SELECT OWED, OWER FROM ACTIVE
       )) THEN
          UPDATE ACTIVE SET ACTIVE.AMOUNT = ACTIVE.AMOUNT+NEW.AMOUNT WHERE NEW.DEBIT_USER = OWED AND NEW.CREDIT_USER = OWER;
       ELSEIF ((NEW.DEBIT_USER, NEW.CREDIT_USER) IN (
         SELECT OWER, OWED FROM ACTIVE
       )) THEN
          SET x := (SELECT AMOUNT FROM ACTIVE WHERE NEW.DEBIT_USER = OWER AND NEW.CREDIT_USER = OWED);
          IF(x > NEW.AMOUNT) THEN
            UPDATE ACTIVE SET AMOUNT = AMOUNT-NEW.AMOUNT WHERE NEW.DEBIT_USER = OWER AND NEW.CREDIT_USER = OWED;
          ELSEIF (NEW.AMOUNT = x) THEN
            DELETE FROM ACTIVE WHERE NEW.DEBIT_USER = OWER AND NEW.CREDIT_USER = OWED;
          ELSE
            DELETE FROM ACTIVE WHERE NEW.DEBIT_USER = OWER AND NEW.CREDIT_USER = OWED;
            INSERT INTO ACTIVE (OWER,OWED,AMOUNT) VALUES(NEW.CREDIT_USER, NEW.DEBIT_USER, NEW.AMOUNT - x);
          END IF;
       ELSE
          INSERT INTO ACTIVE (OWER, OWED, AMOUNT) VALUES (NEW.CREDIT_USER, NEW.DEBIT_USER,NEW.AMOUNT);
       END IF;
    END;
  `).then((res) => console.log(res));
  res.send('hello world');
});

export default router;
