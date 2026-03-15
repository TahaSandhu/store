import express, { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const router: Router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
