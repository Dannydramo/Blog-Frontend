import BlogCard from "@/components/dataDisplay/BlogCard";
import LatestPost from "@/components/dataDisplay/LatestPost";
import { BlogProps } from "@/interfaces/blog";
import Navbar from "@/layout/Navbar";
import { fetchBlogs } from "@/services/blogs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
    const [fetchedBlogs, setFetchedBlogs] = useState<BlogProps[]>([]);
    const [skeletonState, setSkeletonState] = useState({
        blog_data_retrieved: false,
    });
    const [visibleBlogs, setVisibleBlogs] = useState<BlogProps[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            const { status, message, data } = await fetchBlogs();
            if (status !== 200) {
                toast.error(message);
                return;
            }
            toast.success(message);
            const sortedBlogs = data.sort(
                (
                    a: { created_at: string | number | Date },
                    b: { created_at: string | number | Date }
                ) => {
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
                }
            );
            setFetchedBlogs(sortedBlogs);
            setSkeletonState((prevData) => ({
                ...prevData,
                blog_data_retrieved: true,
            }));
        };
        fetchAllBlogs();
    }, []);

    useEffect(() => {
        if (fetchedBlogs.length > 0) {
            const initialVisibleBlogs = fetchedBlogs.slice(0, 15);
            setVisibleBlogs(initialVisibleBlogs);
        }
    }, [fetchedBlogs]);

    const handleLoadMore = async () => {
        setLoading(true);
        const nextVisibleBlogs = fetchedBlogs.slice(
            visibleBlogs.length,
            visibleBlogs.length + 6
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVisibleBlogs((prevVisibleBlogs) => [
            ...prevVisibleBlogs,
            ...nextVisibleBlogs,
        ]);
        setLoading(false);
    };

    return (
        <>
            <Navbar>
                <div className="mx-auto w-[95%] max-w-[1600px] md:w-[90%]">
                    <div className="p-6">
                        <LatestPost
                            fetchedBlogs={fetchedBlogs}
                            skeletonState={skeletonState}
                        />

                        <div className="mt-12">
                            {visibleBlogs.length > 0 && (
                                <h2 className="text-teal-600 font-bold text-2xl my-4">
                                    LATEST POST
                                </h2>
                            )}
                            {visibleBlogs.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
                                    {visibleBlogs.map((blog) => (
                                        <BlogCard
                                            key={blog._id}
                                            blogDetails={blog}
                                        />
                                    ))}
                                </div>
                            )}
                            {visibleBlogs.length > 0 && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Load More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Navbar>
        </>
    );
};

export default Home;
