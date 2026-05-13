import { Router } from 'express';
import { getClientProducts } from '../controllers/clientProductController';

const router = Router();

// Lấy danh sách sản phẩm cho client
router.get('/', getClientProducts);

export default router;
