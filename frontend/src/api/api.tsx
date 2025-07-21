import axios from "axios";
import type { RegistrationFormData } from "../pages/RegistrationPage";

const api = axios.create({
    baseURL: "http://localhost:8007/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const signup = (body: RegistrationFormData) => {
    return api.post('auth/signup',body);
}

export const signin = (body: RegistrationFormData) => {
    return api.post('auth/signin',body);
}

export const logout = () => {
    return api.get("auth/logout");
}

export const verifyUser = () => {
    return api.get('auth/verify');
}