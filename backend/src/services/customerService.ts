import supabaseClient from '../config/supabase';

// Lấy danh sách tất cả khách hàng
export const fetchAllCustomers = async () => {
    const { data: customerList, error: fetchError } = await supabaseClient
        .from('profiles') // Hoặc bảng 'users' tùy DB của bạn
        .select('*')
        .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    return customerList;
};

// Khóa hoặc mở khóa tài khoản khách hàng
export const toggleCustomerStatus = async (customerId: string, isActive: boolean) => {
    const { data: updatedCustomer, error: updateError } = await supabaseClient
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', customerId)
        .select()
        .single();

    if (updateError) throw updateError;
    return updatedCustomer;
};