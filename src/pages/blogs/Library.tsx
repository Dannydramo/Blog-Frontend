import React, { useState, useEffect } from "react";
import BlogCard from "@/components/dataDisplay/BlogCard";
import { getAllBlogsByUser } from "@/services/author";
import { UserStore } from "@/store/userStore";
import Navbar from "@/layout/Navbar";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { BlogProps } from "@/interfaces/blog";

const Library = () => {
    const { user } = UserStore();
    const [userBlogs, setUserBlogs] = useState<BlogProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const { status, message, data } = await getAllBlogsByUser(
                    user?._id!
                );

                if (status === 200) {
                    setUserBlogs(data);
                } else {
                    setError("Failed to fetch user's blogs");
                }
            } catch (error) {
                console.error("Error fetching user's blogs:", error);
                setError("Error fetching user's blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, []);

    return (
        <Navbar>
            <div className="mx-auto w-[95%] max-w-[1600px] md:w-[90%]">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 my-4">
                        {[2, 3, 4].map((data) => (
                            <article
                                key={data}
                                className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
                            >
                                <Skeleton height={224} width="100%" />

                                <div className="bg-white p-2 sm:p-6">
                                    <Skeleton
                                        width={100}
                                        height={16}
                                        className="block text-xs text-gray-500 mb-1"
                                    />

                                    <a href="#">
                                        <h3 className="mt-0.5 text-lg text-gray-900">
                                            <Skeleton width={200} height={20} />
                                        </h3>
                                    </a>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                                            <Skeleton width={80} height={16} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : error ? (
                    <p>{error}</p>
                ) : userBlogs.length === 0 ? (
                    <p>No blogs to display</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 my-4">
                        {userBlogs?.map((blog) => (
                            <div key={blog._id} className="relative">
                                <BlogCard blogDetails={blog} />
                                <Link
                                    to={`/edit/${blog.title}/${blog._id}`}
                                    className="absolute top-2 right-2 px-3 py-1 bg-teal-600 text-white rounded-md"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Navbar>
    );
};

export default Library;
