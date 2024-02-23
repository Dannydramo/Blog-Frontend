import { Input } from "@/components/ui/input";
import Navbar from "@/layout/Navbar";
import { updateUser } from "@/services/author";
import { getUserDetails } from "@/services/onboarding";
import { UserStore } from "@/store/userStore";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
    const { user, setUser } = UserStore();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [editMode, setEditMode] = useState(false);
    const [newDescription, setNewDescription] = useState(
        user?.description || ""
    );
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        const formData = new FormData();
        formData.append("photo", file!);

        try {
            const { status, message, data } = await updateUser(formData);
            if (status !== 200) {
                toast.error(message);
                return;
            }
            setUser(data);
            getUserDetails();
        } catch (error) {
            console.log("Error updating user details", error);
        }
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewDescription(event.target.value);
    };

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setNewDescription(user?.description || "");
    };

    const handleSubmitDescription = async () => {
        try {
            setLoading(true);
            const { status, message, data } = await updateUser({
                description: newDescription,
            });

            if (status !== 200) {
                toast.error(message);
                return;
            }
            setUser(data);
            getUserDetails();
            setEditMode(false);
        } catch (error) {
            console.log("Error updating user description", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%]">
                <div className="shadow p-4 rounded-3xl my-12">
                    <div className="w-full md:w-[80%] mx-auto">
                        <img
                            src={
                                "https://scribbles-backend.onrender.com/public/img/" +
                                user?.photo
                            }
                            alt=""
                            crossOrigin="anonymous"
                            className="h-[100px] w-[100px] md:w-[200px] md:h-[200px] block mx-auto rounded-full"
                        />
                        <input
                            ref={inputFileRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <button
                            className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
                            onClick={handleButtonClick}
                        >
                            Add New Profile Photo
                        </button>
                        <p className="my-4 text-2xl font-bold text-center md:text-3xl">
                            {user?.username}
                        </p>
                        {editMode ? (
                            <div className="flex items-center justify-center">
                                <Input
                                    type="text"
                                    value={newDescription}
                                    onChange={handleDescriptionChange}
                                    className="outline-none"
                                />

                                <button
                                    className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded ml-4"
                                    onClick={handleSubmitDescription}
                                    disabled={loading}
                                >
                                    {loading ? "Submitting" : "  Submit"}
                                </button>

                                <button
                                    className="bg-red-600 hover:bg-red-800py-2 px-4 rounded py-2 text-white ml-2"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="text-center text-base md:text-xl">
                                {user?.description ? (
                                    <>
                                        <p>{user?.description}</p>
                                        <button
                                            className="text-teal-600 hover:text-teal-800 underline mt-2"
                                            onClick={handleEditButtonClick}
                                        >
                                            Edit
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="text-teal-600 hover:text-teal-800 underline"
                                        onClick={handleEditButtonClick}
                                    >
                                        Add Description
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="shadow p-4 md:p-8 rounded-3xl mb-6">
                    <h1 className="text-2xl md:text-3xl mb-4 text-teal-600">
                        Account Info:
                    </h1>
                    <hr />
                    <div className="my-4">
                        <h3 className="text-2xl font-semibold mb-4">
                            Email Address:
                        </h3>
                        <p>{user?.email}</p>
                    </div>
                    <hr />
                </div>
            </section>
        </Navbar>
    );
};

export default Profile;
