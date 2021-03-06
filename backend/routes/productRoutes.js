import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
//import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
// router.route('/').post(protect, admin, createProduct);
// router.route('/top').get(getTopProducts);
// router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').get(getProductById);
// router.route('/:id').delete(protect, admin, deleteProduct);
// router.route('/:id').put(protect, admin, updateProduct);

export default router;
