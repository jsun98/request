import { Router } from 'express';
import Type from 'sequelize';
import { Request, Ledger } from '../../data/models';
import sequelize from '../../data/sequelize';

const router = Router();

router.post('/send', (req, res) => {
  if (req.isAuthenticated()) {
    const { amount, description, receiver } = req.body;
    const sender = req.user.id;
    Request.create({ sender, receiver, amount, description })
      .then(() => res.send('successfully sent request.'))
      .catch(err => res.send(err));
  }
});

router.post('/accept', (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.body;
    const receiver = req.user.id;

    sequelize
      .transaction(t => {
        const updateParams = { active: Date.now() };
        const searchUpdateParams = { where: { id, receiver } };
        const findOneParams = { where: { id } };
        const transaction = { transaction: t };

        return Request.update(updateParams, searchUpdateParams, transaction)
          .then(() => Request.findOne(findOneParams, transaction))
          .then(request => {
            const { dataValues } = request;
            const debitUser = receiver;
            const { sender: creditUser, description, amount } = dataValues;
            const createParams = { debitUser, creditUser, amount, description };

            return Ledger.create(createParams, transaction);
          });
      })
      .then(res3 => res.send('successfully updated request'))
      .catch(err => res.send(err));
  }
});

export default router;
