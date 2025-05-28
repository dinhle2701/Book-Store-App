/* eslint-disable no-unused-vars */
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import API_PATHS from "../constant/apiPath";
import {jwtDecode} from "jwt-decode"; // nhớ import nếu chưa có

export function useGetAllMedicines() {
    return useMutation({
        mutationFn: async (userId) => {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_PATHS.medicines}/medicines`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": userId
                }
            });

            return response.data;
        }
    });
}




export function useGetMedicineById() {
    return useMutation({
        mutationFn: (values) =>
            axios.post(`${API_PATHS.medicines}/medicines/{id}`, values).then((res) => res.data)
    })
}

export function useCreateMedicine() {
    return useMutation({
        mutationFn: (values) =>
            axios.post(`${API_PATHS.medicines}/medicines`, values).then((res) => res.data)
    })
}

export function useUpdateMedicine() {
    return useMutation({
        mutationFn: (values) =>
            axios.post(`${API_PATHS.medicines}/medicines/{id}`, values).then((res) => res.data)
    })
}

export function useGDeleteMedicine() {
    return useMutation({
        mutationFn: (values) =>
            axios.post(`${API_PATHS.medicines}/medicines/{id}`, values).then((res) => res.data)
    })
}
