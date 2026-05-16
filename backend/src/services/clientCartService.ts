import supabaseClient from '../config/supabase';

export const validateAndApplyVoucher = async (code: string, cartTotal: number) => {
    // 1. Lấy thông tin voucher
    const { data: voucher, error } = await supabaseClient
        .from('vouchers')
        .select('*')
        .eq('code', code)
        .single();

    if (error || !voucher) {
        throw new Error('Voucher không tồn tại hoặc không hợp lệ.');
    }

    // 2. Kiểm tra trạng thái
    if (voucher.status !== 'Active' && voucher.status !== 'active') {
        throw new Error('Voucher không còn hoạt động.');
    }

    // 3. Kiểm tra số lượng
    if (voucher.quantity !== null && voucher.quantity <= 0) {
        throw new Error('Voucher đã hết lượt sử dụng.');
    }

    // 4. Kiểm tra thời hạn
    const now = new Date();
    if (voucher.start_date && new Date(voucher.start_date) > now) {
        throw new Error('Voucher chưa đến thời gian sử dụng.');
    }
    if (voucher.end_date && new Date(voucher.end_date) < now) {
        throw new Error('Voucher đã hết hạn.');
    }

    // 5. Kiểm tra điều kiện giá trị đơn hàng tối thiểu
    if (voucher.min_order_value && cartTotal < Number(voucher.min_order_value)) {
        throw new Error(`Đơn hàng chưa đạt giá trị tối thiểu để sử dụng voucher này (${voucher.min_order_value}).`);
    }

    // 6. Tính toán số tiền được giảm
    let discountAmount = 0;
    if (voucher.discount_type === 'Percentage') {
        discountAmount = (cartTotal * Number(voucher.discount_value)) / 100;
        if (voucher.max_discount && discountAmount > Number(voucher.max_discount)) {
            discountAmount = Number(voucher.max_discount);
        }
    } else if (voucher.discount_type === 'Fixed') {
        discountAmount = Number(voucher.discount_value);
    }

    // Đảm bảo số tiền giảm không vượt quá tổng đơn hàng
    if (discountAmount > cartTotal) {
        discountAmount = cartTotal;
    }

    return {
        voucherInfo: voucher,
        discountAmount,
        finalAmount: cartTotal - discountAmount
    };
};
