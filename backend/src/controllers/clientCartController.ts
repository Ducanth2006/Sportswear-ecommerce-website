import type { Request, Response } from 'express';
import { validateAndApplyVoucher } from '../services/clientCartService';

export const applyVoucher = async (req: Request, res: Response): Promise<any> => {
    try {
        const { code, cartTotal } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Vui lòng cung cấp mã voucher." });
        }

        if (cartTotal === undefined || cartTotal === null || isNaN(Number(cartTotal))) {
            return res.status(400).json({ message: "Vui lòng cung cấp tổng giá trị đơn hàng hợp lệ (cartTotal)." });
        }

        const result = await validateAndApplyVoucher(code, Number(cartTotal));

        return res.status(200).json({
            message: "Áp dụng voucher thành công.",
            data: result
        });
    } catch (error: any) {
        console.error("Lỗi applyVoucher:", error);
        return res.status(400).json({
            message: error.message || "Lỗi khi áp dụng voucher."
        });
    }
};
