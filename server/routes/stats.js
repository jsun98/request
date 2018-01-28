import {Router} from express;

const router = Router();

router.get('/balance', (req, res) => {
  res.send('total balance');
});

router.get('/number-of-requests', (req, res) => {
    res.send('#ofreq');
});

router.post('/total-volume', (req, res) => {
    res.send('amount money in&out');
});

/*
 * can have a lot of stats
 * probably one of the less important modules
 *
 */


export default router;
