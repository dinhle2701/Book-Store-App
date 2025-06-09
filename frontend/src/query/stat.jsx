import { useQuery } from '@tanstack/react-query';
import API_PATHS from "../constant/apiPath";
import axios from "axios";

// Hàm fetch dữ liệu thống kê từ API backend
export function useGetStat() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: () =>
            axios.get(`${API_PATHS.book}/stat`).then((res) => res.data),
    });
}

export function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () =>
            axios.get(`${API_PATHS.stat}/stat/user`).then((res) => res.data),
    });
}

export function useGetOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            axios.get(`${API_PATHS.stat}/stat/order`).then((res) => res.data),
    });
}