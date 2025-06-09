import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import API_PATHS from '../constant/apiPath';

// 🔸 Lấy tất cả đơn hàng của admin
export function useGetAllOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            axios.get(`${API_PATHS.order}/orders`).then((res) => res.data),
    });
}

// 🔸 Lấy đơn hàng theo email user
export function useGetOrdersByUser(email) {
    return useQuery({
        queryKey: ['orders', email],
        queryFn: () =>
            axios
                .get(`${API_PATHS.order}/orders/user/${encodeURIComponent(email)}`)
                .then((res) => res.data),
        enabled: !!email, // Chỉ chạy khi có email
    });
}

// 🔸 Lấy chi tiết đơn hàng theo ID và email user
export const useGetOrderDetailByUser = (orderId, email) => {
    return useQuery({
        queryKey: ['order-detail-user', orderId, email],
        queryFn: async () => {
            const res = await axios.get(`${API_PATHS.order}/orders/user/order/${orderId}`, {
                headers: {
                    'X-User-Email': email
                }
            });
            return res.data;
        },
        enabled: !!orderId && !!email // Chỉ fetch nếu có orderId và email
    });
};


// 🔸 Tạo mới đơn hàng
export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderData) =>
            axios.post(`${API_PATHS.order}/orders`, orderData).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']); // Refresh danh sách đơn hàng admin
        },
    });
}
