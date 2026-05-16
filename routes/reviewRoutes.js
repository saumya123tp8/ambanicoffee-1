import express from 'express';
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import { addReviewForProductController, getAllReviewForProductController } from '../controllers/reviewController.js';
import { isAdmin } from '../controllers/authController.js';
const router=express.Router();

router.get('/product-review/:pid',getAllReviewForProductController);

// router.post('/product-review/',addReviewForProductController);
router.post('/product-review/',requireSignIn,addReviewForProductController);

export default router;
