import axios from "axios";
import type { RegistrationFormData } from "../pages/RegistrationPage";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8007/api/",
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

export const fetchLatestInterviews = () => {
    return api.get('/interview/latest');
}

export const fetchInterviewById = (id: string) => {
    return api.get(`/interview/${id}`);
}

// Fetch feedback for a given interview and user
export const fetchFeedbackByInterviewAndUser = (interviewId: string, userId: string) => {
    return api.get(`/feedback?interviewId=${interviewId}&userId=${userId}`);
}