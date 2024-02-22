import { useState } from "react";
import BlogCard from "./BlogCard";
import { BlogProps } from "@/interfaces/blog";

const MissedBlogs = ({ fetchedBlogs }: { fetchedBlogs: BlogProps[] }) => {
    const [randomBlogs, setRandomBlogs] = useState<BlogProps[]>([]);

    const selectRandomBlogs = () => {
        const randomIndexes: number[] = [];
        while (randomIndexes.length < 3) {
            const randomIndex = Math.floor(Math.random() * fetchedBlogs.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        const selectedBlogs = randomIndexes.map((index) => fetchedBlogs[index]);
        setRandomBlogs(selectedBlogs);
    };

    selectRandomBlogs();

    return (
        <>
            {randomBlogs.length > 0 && (
                <div className="mt-6">
                    <h1 className="font-bold text-teal-600 text-2xl my-4">
                        INCASE YOU MISSED IT!
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
                        {randomBlogs.map((blog) => (
                            <BlogCard key={blog._id} blogDetails={blog} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MissedBlogs;
