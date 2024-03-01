import { BlogContent } from "@/interfaces/blog";
import { Axios } from "../helpers/axiosHelper";
import Cookies from "js-cookie";
import axios from "axios";

let status: number;
let message: string;
let data: any;

export const getAuthorDetails = async (authorId: string) => {
    try {
        const response = await Axios({
            url: `/blog/author-details/${authorId}`,
            method: "get",
        });
        status = 200;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data };
};

export const uploadBlog = async (formData: BlogContent) => {
    const token = Cookies.get("token");
    try {
        const response = await axios.post(
            "https://pink-stormy-binturong.cyclic.app/api/v1/blog/post",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response);

        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const updateBlog = async (formData: BlogContent, blogId: string) => {
    const token = Cookies.get("token");

    try {
        const response = await axios.patch(
            `https://pink-stormy-binturong.cyclic.app/api/v1/blog/edit/${blogId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const getAllBlogsByUser = async (userId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/blog/my-blogs/${userId}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;
        message = response.data.message;
        data = response.data.blogs;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const updateUser = async (data: any) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/auth/update-me`,
            method: "patch",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });
        status = 200;
        message = response.data.message;
        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
