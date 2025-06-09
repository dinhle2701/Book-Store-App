import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "../constant/apiPath";

export function useGetBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: () =>
            axios.get(`${API_PATHS.book}/book`).then((res) => res.data),
    });
}

// Lấy sách theo ID
export function useGetBookById(id) {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () =>
            axios.get(`${API_PATHS.book}/book/${id}`).then(res => res.data),
        enabled: !!id, // Chỉ gọi khi có id
    });
}

// Tạo sách mới
export function useCreateBook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData) =>
            axios.post(`${API_PATHS.book}/book`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['books']);
        },
    });
}


// Cập nhật sách
export function useUpdateBook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedBook }) =>
            axios.put(`${API_PATHS.book}/book/${id}`, updatedBook).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['books']);
        },
    });
}

// Xoá sách
export function useDeleteBook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) =>
            axios.delete(`${API_PATHS.book}/book/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['books']);
        },
    });
}

// thêm nhận xét
export function useAddReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (reviewData) => {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `${API_PATHS.book}/book/review`,
                reviewData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['book', variables.book]);
        },
    });
}



// hiển thị nhận xét
export function useGetReviewsByBook(bookId) {
    return useQuery({
        queryKey: ['reviews', bookId],
        queryFn: () =>
            axios.get(`${API_PATHS.book}/review/${bookId}`).then(res => res.data),
        enabled: !!bookId, // chỉ gọi nếu có bookId
    });
}