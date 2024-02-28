import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Navbar from "@/layout/Navbar";
import { getArchiveBlogs } from "@/services/archive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";

const Archived = () => {
    dayjs.extend(customParseFormat);
    const [archivedBlogs, setArchivedBlogs] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchivedBlogs = async () => {
            try {
                const { status, message, data } = await getArchiveBlogs();
                if (status !== 200) {
                    toast.error(message);
                    return;
                }

                setArchivedBlogs(data);
                setLoading(false);
            } catch (error) {
                console.log("Error getting archived blogs", error);
            }
        };
        fetchArchivedBlogs();
    }, []);

    if (loading) {
        return (
            <Navbar>
                <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%]">
                    <h1 className="text-center my-6 text-[#00897B] text-3xl font-bold">
                        Archived
                    </h1>
                    {[...Array(5)].map((_, index) => (
                        <div
                            className="border my-2 flex space-x-4 md:space-x-8 p-4 items-center"
                            key={index}
                        >
                            <Skeleton width={100} height={20} />
                            <Skeleton width={300} height={20} />
                        </div>
                    ))}
                </section>
            </Navbar>
        );
    }

    if (archivedBlogs.length === 0) {
        return (
            <Navbar>
                <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%]">
                    <h1 className="text-center text-[#00897B] my-6 text-3xl font-bold">
                        Archived
                    </h1>
                    <p className="text-center">No archived blogs found.</p>
                </section>
            </Navbar>
        );
    }

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%]">
                <h1 className="text-center text-[#00897B] my-6 text-3xl font-bold">
                    Archived
                </h1>
                {archivedBlogs.map((archivedBlog: any) => (
                    <Link
                        to={`/${archivedBlog.blog.slug}/${archivedBlog.blog._id}`}
                        className="border my-2 flex space-x-4 md:space-x-8 p-4 items-center"
                        key={archivedBlog.blog._id}
                    >
                        <p className="shadow p-2">
                            {dayjs(archivedBlog.created_at).format(
                                "D MMM YYYY"
                            )}
                        </p>
                        <h1 className="text-2xl font-bold">
                            {archivedBlog.blog.title}
                        </h1>
                    </Link>
                ))}
            </section>
        </Navbar>
    );
};

export default Archived;
