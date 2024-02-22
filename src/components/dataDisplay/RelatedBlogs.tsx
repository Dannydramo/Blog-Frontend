import BlogCard from "./BlogCard";

const RelatedBlogs = ({ relatedBlogs }: { relatedBlogs: BlogProps[] }) => {
    return (
        <>
            <div className="my-8">
                <h2 className="my-8 text-teal-600 text-4xl sm:text-5xl font-bold">
                    Related Blogs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
                    {relatedBlogs.map((relatedBlog) => (
                        <BlogCard
                            key={relatedBlog._id}
                            blogDetails={relatedBlog}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default RelatedBlogs;
