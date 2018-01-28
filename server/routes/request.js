import {Router} from express;

const router = Router();

router.post('/send', (req, res) => {
    res.send('Send a request!');
});

router.post('/accept', (req, res) => {
  res.send('Accept a request!');
})

export default router;
