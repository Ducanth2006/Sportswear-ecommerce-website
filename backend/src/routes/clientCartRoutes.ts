import { Router } from 'express';
import { applyVoucher } from '../controllers/clientCartController';

const router = Router();

/**
 * @swagger
 * /cart/apply-voucher:
 *   post:
 *     summary: Áp dụng voucher (Public)
 *     description: Gửi mã voucher để kiểm tra hợp lệ, trả về số tiền được giảm và tổng tiền sau khi giảm.
 *     tags: [Client Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - cartTotal
 *             properties:
 *               code:
 *                 type: string
 *                 description: Mã voucher
 *                 example: "SUMMER20"
 *               cartTotal:
 *                 type: number
 *                 description: Tổng giá trị đơn hàng hiện tại
 *                 example: 500000
 *     responses:
 *       200:
 *         description: Áp dụng voucher thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Áp dụng voucher thành công."
 *                 data:
 *                   type: object
 *                   properties:
 *                     voucherInfo:
 *                       type: object
 *                       description: Dữ liệu chi tiết của voucher từ database
 *                     discountAmount:
 *                       type: number
 *                       description: Số tiền được giảm
 *                       example: 50000
 *                     finalAmount:
 *                       type: number
 *                       description: Tổng tiền sau khi đã trừ đi số tiền giảm
 *                       example: 450000
 *       400:
 *         description: Voucher không hợp lệ hoặc lỗi dữ liệu đầu vào
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Voucher không còn hoạt động."
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi hệ thống (Internal Server Error)"
 *     security: []
 */
router.post('/apply-voucher', applyVoucher);

export default router;
