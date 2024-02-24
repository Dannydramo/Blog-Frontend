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
            <Link to={`/${blogDetails.title}/${blogDetails._id}`}>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                    <img
                        alt={blogDetails.title + "Image"}
                        src={
                            "https://scribbles-backend.onrender.com/public/img/" +
                            blogDetails.coverImage
                        }
                        crossOrigin="anonymous"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <p>{formattedDate}</p>

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
