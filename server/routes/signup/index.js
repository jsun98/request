import { Router } from 'express';
import { User } from '../../data/models';

const router = Router();

router.post('/', (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  User.create({ username, firstname, lastname, password })
    .then(() => res.send('successful signup request made!'))
    .catch(err => res.send(err));
});

export default router;
