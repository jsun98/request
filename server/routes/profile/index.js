import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  if (req.user) {
    res.send('successful access profile from sessionId');
  } else {
    res.send('failed profile access');
  }
});

export default router;
