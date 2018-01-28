import {Router} from express;

const router = Router();

// remember to make login with facebook

router.post('/login', (req, res) => {
    res.send('Attempt to login');
});

router.post('/signup', (req, res) => {
  res.send('Signup for account');
})

export default router;
