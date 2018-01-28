import {Router} from express;

const router = Router();

// based off of query paramters & payload
router.get('/', (req, res) => {
    res.send('Get transaction history based off of id');
});

export default router;
