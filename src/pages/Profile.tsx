import Navbar from "@/layout/Navbar";
import { updateUser } from "@/services/author";
import { getUserDetails } from "@/services/onboarding";
import { UserStore } from "@/store/userStore";
import React, { useRef } from "react";

const Profile = () => {
    const { user, setUser } = UserStore();
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputFileRef.current?.click(); // Programmatically trigger input file click
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
                return;
            }
            setUser(data);
            getUserDetails();
        } catch (error) {
            console.log("Error updating user details", error);
        }
    };

    return (
        <Navbar>
            <section className="mx-auto max-w-[1600px] w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%]">
                <div className="shadow p-4 rounded-3xl my-12">
                    <img
                        src={"http://localhost:8000/public/img/" + user?.photo}
                        alt=""
                        crossOrigin="anonymous"
                        className="h-[100px] w-[100px] md:w-[200px] md:h-[200px] block mx-auto rounded-full"
                    />
                    {/* Hidden input file element */}
                    <input
                        ref={inputFileRef}
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    {/* Button to trigger file input */}
                    <button
                        className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
                        onClick={handleButtonClick}
                    >
                        Add New Profile Photo
                    </button>

                    <p className="my-4 text-2xl font-bold text-center md:text-3xl">
                        {user?.username}
                    </p>
                    <p className="text-center text-base md:text-xl">
                        {user?.description}
                    </p>
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
