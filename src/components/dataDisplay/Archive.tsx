import { useEffect, useState } from "react";
import {
    archiveBlog,
    fetchBlogArchiveStatus,
    unarchiveBlog,
} from "@/services/archive";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "sonner";

const Archive = ({ blogId }: { blogId: string }) => {
    const [isArchived, setIsArchived] = useState(false);
    const fetchArchivedStatus = async () => {
        try {
            const { data } = await fetchBlogArchiveStatus(blogId);

            setIsArchived(data);
        } catch (error) {
            console.error("Error fetching archived status:", error);
            return;
        }
    };
    useEffect(() => {
        fetchArchivedStatus();
    }, []);

    const handleArchive = async () => {
        try {
            const { status, message } = await archiveBlog(blogId);
            if (status === 200) {
                toast.success(message);
                setIsArchived(true);
                fetchArchivedStatus();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Error archiving blog:", error);
            toast.error("Failed to archive blog");
        }
    };

    const handleUnarchive = async () => {
        try {
            const { status, message } = await unarchiveBlog(blogId);
            if (status === 200) {
                toast.success(message);
                setIsArchived(false);
                fetchArchivedStatus();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Error unarchiving blog:", error);
            toast.error("Failed to unarchive blog");
        }
    };

    return (
        <div>
            {isArchived ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                height={30}
                                width={30}
                                onClick={handleUnarchive}
                                className="cursor-pointer"
                            >
                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                            </svg>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unarchive</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height={30}
                                width={30}
                                onClick={handleArchive}
                                className="cursor-pointer"
                            >
                                <path d="M0 48C0 21.5 21.5 0 48 0H336c26.5 0 48 21.5 48 48V489.9c0 12.2-9.9 22.1-22.1 22.1c-4.4 0-8.6-1.3-12.3-3.7L192 403.2 34.4 508.3c-3.6 2.4-7.9 3.7-12.3 3.7C9.9 512 0 502.1 0 489.9V48zM48 32c-8.8 0-16 7.2-16 16V471.4L183.1 370.7c5.4-3.6 12.4-3.6 17.8 0L352 471.4V48c0-8.8-7.2-16-16-16H48z" />
                            </svg>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Archive</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );
};

export default Archive;
