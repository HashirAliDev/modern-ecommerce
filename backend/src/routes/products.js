import express from 'express';
import {
  getProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductDetails);
router.route('/reviews').get(getProductReviews);

// Protected routes
router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizeRoles('admin', 'seller'), createProduct);

router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin', 'seller'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin', 'seller'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

export default router;
