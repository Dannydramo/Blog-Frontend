import { Axios } from "../helpers/axiosHelper";
import Cookies from "js-cookie";

let status: number;
let message: string;
let data: any;

export const getBlogReviews = async (id: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/blog/reviews/${id}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;
        message = response.data.message;
        data = response.data.reviews;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const addReview = async (id: string, comment: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/blog/${id}/reviews`,
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: {
                comment,
            },
        });
        status = 200;
        console.log(response);

        message = response.data.message;
        data = response.data.review;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const editReview = async (id: string, comment: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/blog/edit-review/${id}`,
            method: "patch",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: {
                comment,
            },
        });
        status = 200;
        message = response.data.message;
        data = response.data.review;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const deleteReview = async (id: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/blog/delete-review/${id}`,
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};
