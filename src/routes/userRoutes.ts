import express from 'express';
import { createUser, fundUser, withdrawFunds, transferFunds, getAllUsers, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.post('/fund', fundUser);
router.post('/withdraw', withdrawFunds);
router.post('/transfer', transferFunds);

router.get('/', getAllUsers);
router.delete('/delete/:id', deleteUser);  // DELETE route to delete a user by ID

export default router;
