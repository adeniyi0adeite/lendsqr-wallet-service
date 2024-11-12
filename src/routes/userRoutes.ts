import express from 'express';
import { createUser, fundUser, withdrawFunds, transferFunds } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.post('/fund', fundUser);
router.post('/withdraw', withdrawFunds);
router.post('/transfer', transferFunds);

export default router;
