import BlogEditor from "@/components/BlogEditor";
import Navbar from "@/layout/Navbar";
import { fetchBlogById } from "@/services/blogs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import { BlogProps } from "@/interfaces/blog";
const EditBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<BlogProps>();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { status, data } = await fetchBlogById(blogId!);
                if (status === 200) {
                    setBlog(data);
                } else {
                    console.error("Failed to fetch blog");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [blogId]);

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%]">
                <div>{blog && <BlogEditor blog={blog} />}</div>
            </section>
        </Navbar>
    );
};

export default EditBlog;
