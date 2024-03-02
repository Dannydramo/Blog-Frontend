import { BlogProps } from "@/interfaces/blog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link } from "react-router-dom";

const BlogCard = ({ blogDetails }: { blogDetails: BlogProps }) => {
    dayjs.extend(customParseFormat);
    const date = dayjs(blogDetails.created_at);
    const formattedDate = date.format("D MMM YYYY");

    return (
        <>
            <Link to={`/${blogDetails.slug}/${blogDetails._id}`}>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                    <img
                        alt={blogDetails.title + " Image"}
                        src={blogDetails.coverImage}
                        crossOrigin="anonymous"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <div className="flex gap-6 items-center">
                            <div className="flex gap-2">
                                <img
                                    src={blogDetails.author.photo}
                                    alt=""
                                    className="h-[30px] w-[30px]"
                                />
                                <p>{blogDetails.author.username}</p>
                            </div>
                            <div className="flex gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    height={20}
                                    width={20}
                                >
                                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
                                </svg>
                                <p>{formattedDate}</p>
                            </div>
                        </div>

                        <h3 className="my-2 truncate text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {blogDetails.title}
                        </h3>
                        <p className="truncate h-12">{blogDetails.summary}</p>

                        <div className="mt-2 flex flex-wrap gap-1">
                            <span className="whitespace-nowrap rounded-full bg-purple-100 px-3 py-1 text-sm text-teal-600">
                                {blogDetails.category}
                            </span>
                        </div>
                    </div>
                </article>
            </Link>
        </>
    );
};

export default BlogCard;
