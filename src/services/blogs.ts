import { Axios } from "../helpers/axiosHelper";

let status: number;
let message: string;
let data: any;

export const fetchBlogs = async () => {
    try {
        const response = await Axios({
            url: "/blog/",
            method: "get",
        });
        status = 200;
        message = response.message;
        data = response.data.blogs;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const fetchBlogById = async (id: string) => {
    try {
        const response = await Axios({
            url: `/blog/${id}`,
            method: "get",
        });
        status = 200;
        message = response.message;
        data = response.data.blog;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const fetchRelatedBlogsByAuthor = async (authorId: string) => {
    try {
        const response = await Axios({
            url: `/blog/author/${authorId}`,
            method: "get",
        });
        status = 200;
        message = response.message;
        data = response.data.blogs;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const generateBlogContent = async (title: string) => {
    try {
        const response = await Axios({
            url: `/blog/generate`,
            method: "post",
            body: { title },
        });

        status = 200;
        message = response.message;
        data = response.data.text;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
