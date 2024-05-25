import BlogCard from '@/components/dataDisplay/BlogCard';
import LatestPost from '@/components/dataDisplay/LatestPost';
import { BlogProps } from '@/interfaces/blog';
import Navbar from '@/layout/Navbar';
import { fetchBlogs } from '@/services/blogs';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import SEO from '../../components/Seo';

const Home = () => {
    const [fetchedBlogs, setFetchedBlogs] = useState<BlogProps[]>([]);
    const [visibleBlogs, setVisibleBlogs] = useState<BlogProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [skeletonState, setSkeletonState] = useState({
        blog_data_retrieved: false,
    });

    const fetchAllBlogs = useCallback(async () => {
        setLoading(true);
        const { status, message, data } = await fetchBlogs();
        if (status !== 200) {
            toast.error(message);
            setLoading(false);
            return;
        }
        toast.success(message);
        const sortedBlogs = data.sort(
            (
                a: { created_at: string | number | Date },
                b: { created_at: string | number | Date }
            ) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
        setFetchedBlogs(sortedBlogs);
        setVisibleBlogs(sortedBlogs.slice(0, 15));
        setSkeletonState({ blog_data_retrieved: true });
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAllBlogs();
    }, [fetchAllBlogs]);

    const handleLoadMore = async () => {
        setLoading(true);
        const nextVisibleBlogs = fetchedBlogs.slice(
            visibleBlogs.length,
            visibleBlogs.length + 6
        );
        setTimeout(() => {
            setVisibleBlogs((prevVisibleBlogs) => [
                ...prevVisibleBlogs,
                ...nextVisibleBlogs,
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <SEO
                title="Home - Latest Blog Posts and Articles"
                description="Explore the latest blog posts and articles on our blog. Stay updated with fresh content, insights, and tips from various fields."
                name="Scribbles - Snowy"
                type="website"
                image="SC"
                url="https://scribbles-snowy.vercel.app"
                siteName="Scribbles - Snowy"
            />
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
                            {visibleBlogs.length < fetchedBlogs.length && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Load More'}
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
