import BlogCard from "@/components/dataDisplay/BlogCard";
import Navbar from "@/layout/Navbar";
import { getAuthorDetails } from "@/services/author";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AuthorProps, BlogProps } from "@/interfaces/blog";

const Author = () => {
    const { authorId } = useParams();
    const [authorData, setAuthorData] = useState<AuthorProps | null>(null);
    const [blogs, setBlogs] = useState<BlogProps[]>([]);

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                if (authorId) {
                    const { status, data } = await getAuthorDetails(authorId);
                    if (status !== 200) {
                        return;
                    }
                    setAuthorData(data.author);
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching author details", error);
            }
        };

        fetchAuthorDetails();
    }, []);

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%]">
                {!authorData && (
                    <div className="flex flex-col items-center justify-center my-12">
                        <Skeleton circle={true} height={100} width={100} />
                        <Skeleton height={40} width={200} />
                        <Skeleton height={30} width={300} />
                        <Skeleton height={20} width={150} />
                    </div>
                )}

                {authorData && (
                    <div className="flex flex-col items-center justify-center my-12">
                        <img
                            src={
                                "http://localhost:8000/public/img/" +
                                authorData.photo
                            }
                            crossOrigin="anonymous"
                            alt=""
                            className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
                        />
                        <p className="font-bold text-3xl sm:text-4xl mt-8">
                            {authorData.username}
                        </p>
                        {authorData.description && (
                            <p className="text-base md:text-lg my-3 text-center">
                                {authorData.description}
                            </p>
                        )}
                        <p className="my-3">{`${blogs.length} ${
                            blogs.length === 1 ? "post" : "posts"
                        }`}</p>
                    </div>
                )}

                {!blogs.length && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
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
                )}

                {blogs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 my-6">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} blogDetails={blog} />
                        ))}
                    </div>
                )}
            </section>
        </Navbar>
    );
};

export default Author;
