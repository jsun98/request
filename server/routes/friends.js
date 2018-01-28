import {Router} from express;

const router = Router();

router.get('/', (req, res) => {
  res.send('Get a list of a friends');
});

router.post('/new', (req, res) => {
    res.send('Send a friend request!');
});

// Need to update other persons REDUX store of friends...
// prefer not to use Socket.io
router.post('/accept', (req, res) => {
    res.send('Accept a friend request!');
});

export default router;
