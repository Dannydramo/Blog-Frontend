import { Axios } from "../helpers/axiosHelper";
import Cookies from "js-cookie";

let status: number;
let message: string;
let data: any;

export const archiveBlog = async (blogId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/archive/${blogId}`,
            method: "patch",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;

        message = response.data.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const unarchiveBlog = async (blogId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/archive/unarchive/${blogId}`,
            method: "patch",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;

        message = response.data.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getArchiveBlogs = async () => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/archive/`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;

        message = response.data.message;
        data = response.data.archivedBlogs;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }

    return { status, message, data };
};

export const fetchBlogArchiveStatus = async (blogId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await Axios({
            url: `/archive/status/${blogId}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        status = 200;

        message = response.data.message;
        data = response.data.archived;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
