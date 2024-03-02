import { Axios } from "../helpers/axiosHelper";
import {
    RegisterProps,
    LoginProps,
    ForgotPasswordProps,
    ResetPasswordProps,
} from "../interfaces/onboarding";
import Cookies from "js-cookie";

let status: number;
let message: string;
let data: any;

export const registerUser = async (payload: RegisterProps) => {
    try {
        const response = await Axios({
            url: "/auth/signup",
            method: "post",
            body: payload,
        });
        status = 200;
        message = response.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const signInUser = async (payload: LoginProps) => {
    try {
        const response = await Axios({
            url: "/auth/login",
            method: "post",
            body: payload,
        });
        status = 200;
        message = response.message;

        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const forgotPassword = async (payload: ForgotPasswordProps) => {
    try {
        const response = await Axios({
            url: "/auth/forgot-password",
            method: "post",
            body: payload,
        });

        status = 200;
        message = response.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const resetPassword = async (
    payload: ResetPasswordProps,
    token: string
) => {
    try {
        const response = await Axios({
            url: `/auth/reset-password/${token}`,
            method: "patch",
            body: payload,
        });
        status = 200;
        message = response.message;

        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getUserDetails = async () => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/auth/user-details`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;
        message = response.data.message;
        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data };
};
