import Skeleton from "react-loading-skeleton";
import BlogCard from "./BlogCard";
import { BlogProps } from "@/interfaces/blog";

const LatestPost = ({
    fetchedBlogs,
    skeletonState,
}: {
    fetchedBlogs: BlogProps[];
    skeletonState: {
        blog_data_retrieved: boolean;
    };
}) => {
    return (
        <div>
            <h1 className="font-bold text-teal-600 text-2xl my-4">
                FEATURED POST
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
                {!skeletonState.blog_data_retrieved
                    ? [2, 3, 4, 5, 6, 7, 8, 9].map((data) => (
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
                      ))
                    : fetchedBlogs
                          .slice(0, 3)
                          .map((blog) => (
                              <BlogCard key={blog._id} blogDetails={blog} />
                          ))}
            </div>
        </div>
    );
};

export default LatestPost;
