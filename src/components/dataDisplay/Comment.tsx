import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    addReview,
    getBlogReviews,
    deleteReview,
    editReview,
} from "@/services/review";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UserStore } from "@/store/userStore";

const Comment = ({ blogId }: { blogId: string }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [comment, setComment] = useState<string>("");
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editedComment, setEditedComment] = useState<string>("");
    const [loading, setLoading] = useState<{
        add: boolean;
        edit: boolean;
        delete: boolean;
    }>({ add: false, edit: false, delete: false });
    const { user } = UserStore();

    const fetchReviews = async () => {
        const { status, data } = await getBlogReviews(blogId);

        if (status !== 200) {
            toast.error("Failed to fetch reviews");
            return;
        }
        setReviews(data);
    };

    useEffect(() => {
        fetchReviews();
    }, [blogId]);

    const handleAddReview = async () => {
        setLoading({ ...loading, add: true });
        try {
            const { status } = await addReview(blogId, comment);
            if (status !== 200) {
                toast.error("Failed to add review");
                return;
            }
            setComment("");
            fetchReviews();
        } catch (error) {
            console.error("Failed to add review", error);
        } finally {
            setLoading({ ...loading, add: false });
        }
    };

    const handleEditReview = async (
        reviewId: string,
        updatedComment: string
    ) => {
        setLoading({ ...loading, edit: true });
        try {
            const { status } = await editReview(reviewId, updatedComment);
            if (status !== 200) {
                toast.error("Failed to edit review");
                return;
            }
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review._id === reviewId
                        ? { ...review, comment: updatedComment }
                        : review
                )
            );
            setEditingReviewId(null);
        } catch (error) {
            console.error("Failed to edit review", error);
        } finally {
            setLoading({ ...loading, edit: false });
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        setLoading({ ...loading, delete: true });
        try {
            const { status } = await deleteReview(reviewId);

            if (status === 200) {
                toast.error("Failed to delete review");
            }
            fetchReviews();
        } catch (error) {
            console.error("Failed to delete review", error);
        } finally {
            setLoading({ ...loading, delete: false });
        }
    };

    return (
        <Sheet>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <SheetTrigger asChild>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height={30}
                                width={30}
                                className="cursor-pointer"
                            >
                                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c-4.1-4.2-7.8-8.7-11.3-13.5c-1.7-2.3-3.3-4.6-4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                            </svg>
                        </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Comment</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Comments</SheetTitle>
                </SheetHeader>
                <Textarea
                    value={comment}
                    className="mt-4"
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    onClick={handleAddReview}
                    className="mt-4 bg-teal-600 mb-4 hover:bg-teal-600"
                    disabled={loading.add}
                >
                    {loading.add ? "Adding Comment..." : "Add Comment"}
                </Button>

                <hr />

                {reviews.length === 0 ? (
                    <p className="mt-4">No comments available</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="border-b py-2">
                            {editingReviewId === review._id ? (
                                <>
                                    <Textarea
                                        className="mb-4"
                                        value={editedComment || review.comment}
                                        onChange={(e) =>
                                            setEditedComment(e.target.value)
                                        }
                                    />
                                    {user && user._id === review.user._id && (
                                        <>
                                            <Button
                                                className="bg-teal-600 mr-2 hover:bg-teal-600"
                                                onClick={() =>
                                                    handleEditReview(
                                                        review._id,
                                                        editedComment
                                                    )
                                                }
                                                disabled={loading.edit}
                                            >
                                                {loading.edit
                                                    ? "Saving..."
                                                    : "Save"}
                                            </Button>
                                            <Button
                                                className="bg-teal-600 mr-2 hover:bg-teal-600"
                                                onClick={() =>
                                                    setEditingReviewId(null)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="flex gap-4">
                                        <div className="">
                                            <img
                                                src={review.user.photo}
                                                alt=""
                                            />
                                        </div>

                                        <div className="">
                                            <p className="mb-2">
                                                {review.user.username}
                                            </p>
                                            <p className="mb-2">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                    {user && user._id === review.user._id && (
                                        <>
                                            <Button
                                                className="bg-teal-600 mr-2 hover:bg-teal-600"
                                                onClick={() =>
                                                    setEditingReviewId(
                                                        review._id
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="bg-red-600 mr-2 hover:bg-red-600"
                                                onClick={() =>
                                                    handleDeleteReview(
                                                        review._id
                                                    )
                                                }
                                                disabled={loading.delete}
                                            >
                                                {loading.delete
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Comment;
