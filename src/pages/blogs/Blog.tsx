import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import { fetchBlogById, fetchRelatedBlogsByAuthor } from "@/services/blogs";
import Skeleton from "react-loading-skeleton";
import RelatedBlogs from "@/components/dataDisplay/RelatedBlogs";
import Comment from "@/components/dataDisplay/Comment";
import Archive from "@/components/dataDisplay/Archive";
import { BlogProps } from "@/interfaces/blog";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogProps | undefined>();
    const [relatedBlogs, setRelatedBlogs] = useState<BlogProps[]>([]);
    const [skeletonState, setSkeletonState] = useState({
        blog_data_retrieved: false,
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { status, data } = await fetchBlogById(id!);
                if (status !== 200) {
                    return;
                }
                setBlog(data);
                setSkeletonState((prevData) => ({
                    ...prevData,
                    blog_data_retrieved: true,
                }));
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, []);

    useEffect(() => {
        if (blog) {
            fetchRelatedBlogs(blog.author._id);
        }
    }, []);

    const fetchRelatedBlogs = async (authorId: string) => {
        try {
            const { status, data } = await fetchRelatedBlogsByAuthor(authorId);
            if (status !== 200) {
                return;
            }

            const filteredBlogs = data.filter(
                (item: { _id: string | undefined }) => item._id !== id
            );

            setRelatedBlogs(filteredBlogs.slice(0, 3));
        } catch (error) {
            console.error("Error fetching related blogs:", error);
        }
    };

    if (!skeletonState.blog_data_retrieved) {
        return (
            <Navbar>
                <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%]">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="w-full md:w-[50%]">
                            <Skeleton height={700} />
                        </div>
                        <div className="w-full md:w-[45%] mt-6">
                            <Skeleton height={60} width={60} circle={true} />
                            <Skeleton height={20} width={100} />
                            <Skeleton height={40} width={200} />
                            <Skeleton height={200} width={400} />
                        </div>
                    </div>
                </section>
            </Navbar>
        );
    }

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%]">
                <div className="w-1/2">
                    <hr />
                    <div className="my-2 flex justify-between">
                        <Comment blogId={id!} />

                        <Archive blogId={id!} />
                    </div>
                    <hr className="mb-4" />
                </div>
                {blog && (
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="w-full md:w-[50%]">
                            <img
                                src={
                                    "https://blog-backend-x9ap.onrender.com/public/img/" +
                                    blog.coverImage
                                }
                                crossOrigin="anonymous"
                                alt=""
                                className="h-[70vh] w-full rounded-3xl"
                            />
                        </div>
                        <div className="w-full md:w-[45%] mt-6">
                            <Link
                                to={`/author/${blog.author.username}/${blog.author._id}`}
                            >
                                <div className="flex gap-3 items-center">
                                    <img
                                        src={
                                            "https://blog-backend-x9ap.onrender.com/public/img/" +
                                            blog.author.photo
                                        }
                                        crossOrigin="anonymous"
                                        alt=""
                                        className="h-[60px] w-[60px] rounded-full"
                                    />
                                    <p>{blog.author.username}</p>
                                </div>
                            </Link>
                            <h1 className="mt-8 mb-3 text-4xl sm:text-5xl font-bold">
                                {blog.title}
                            </h1>
                            <p className="text-base md:text-xl my-6">
                                {blog.summary}
                            </p>
                        </div>
                    </div>
                )}

                {blog && <hr className="my-12 hidden md:block" />}
                <div className="text-base md:text-xl w-full mx-auto md:w-[80%] lg:w-[75%] my-8">
                    {blog && (
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    )}
                </div>
                <div></div>
                {relatedBlogs.length > 0 && (
                    <RelatedBlogs relatedBlogs={relatedBlogs} />
                )}
            </section>
        </Navbar>
    );
};

export default Blog;
