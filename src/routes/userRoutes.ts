import express from 'express';
import { createUser, fundUser, withdrawFunds, transferFunds, getAllUsers } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.post('/fund', fundUser);
router.post('/withdraw', withdrawFunds);
router.post('/transfer', transferFunds);


// GET route to retrieve all users
router.get('/', getAllUsers); // This will handle the GET request to /api/users/

export default router;
