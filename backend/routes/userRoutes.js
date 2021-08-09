import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deletetUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/').post(registerUser);
router.route('/').get(protect, admin, getUsers);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deletetUser);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser);

export default router;
