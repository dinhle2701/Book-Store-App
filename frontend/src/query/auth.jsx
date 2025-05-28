import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import API_PATHS from "../constant/apiPath";

export function useLogin() {
    return useMutation({
      mutationFn: (values) =>
        axios.post(`${API_PATHS.auth}/auth/login`, values).then((res) => res.data)
    });
  }
  
  export function useRegister() {
    return useMutation({
      mutationFn: (values) =>
        axios.post(`${API_PATHS.auth}/auth/register`, values).then((res) => res.data)
    });
  }