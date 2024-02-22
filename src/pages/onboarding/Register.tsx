import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AuthImage from "../../assets/auth-image.jpg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterProps } from "../../interfaces/onboarding";
import { registerUser } from "../../services/onboarding";
import { registerValidationSchema } from "../../validators/onboarding";
import TextInput from "@/components/TextInput";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormdata] = useState<RegisterProps>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [confirmTogglePassword, setConfirmTogglePassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterProps>({
        resolver: yupResolver(registerValidationSchema),
    });

    // Update form values with user typed values
    const handleChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormdata({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Function to submit form
    const onSubmit = async (data: RegisterProps) => {
        // Check if password matches with confirm password
        setIsLoading(true);
        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password do not match");
            setIsLoading(false);
            return;
        }

        try {
            // Call API service for registration
            console.log(formData);

            const { status, message } = await registerUser(formData);
            if (status !== 200) {
                toast.error(message);
                setIsLoading(false);
                return;
            }
            navigate("/");
        } catch (err) {
            toast.error(
                "Unable to process form submission. Kindly check all your connection and try again"
            );
            setIsLoading(false);
            return;
        }
    };
    return (
        <div className="w-[90%] lg:w-[90%] sm:w-[70%] md:w-[60%] max-w-[1600px] mx-auto">
            <div className="py-4 lg:py-8 lg:space-x-6 lg:flex  lg:min-h-screen lg:justify-between">
                <div className="w-full lg:w-1/2 lg:flex lg:justify-center lg:items-center lg:flex-col">
                    <h1 className="font-bold text-teal-600 lg:w-[80%] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 mb-6">
                        Scribbles
                    </h1>
                    <h2 className="lg:w-[80%] text-teal-600 mt-8 mb-3 text-4xl sm:text-5xl font-bold">
                        Create Account
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:w-[80%]"
                    >
                        <div className="grid my-6 w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="username" className="text-base">
                                User Name
                            </Label>
                            <TextInput
                                type="text"
                                placeholder="Username"
                                name="userName"
                                className="py-4 text-base md:text-lg"
                                register={register}
                                errors={errors}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid w-full my-6 max-w-sm items-center gap-1.5">
                            <Label htmlFor="email" className="text-base">
                                Email
                            </Label>
                            <TextInput
                                type="email"
                                // id="email"
                                placeholder="Email"
                                className="py-4 text-base md:text-lg"
                                name="email"
                                register={register}
                                errors={errors}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center my-6 gap-1.5">
                            <Label htmlFor="password" className="text-base">
                                Password
                            </Label>
                            <div className="relative">
                                <TextInput
                                    type={togglePassword ? "text" : "password"}
                                    placeholder="*******"
                                    name="password"
                                    className="py-4 text-base md:text-lg"
                                    register={register}
                                    errors={errors}
                                    onChange={handleChange}
                                />

                                <div
                                    onClick={() => {
                                        setTogglePassword(!togglePassword);
                                    }}
                                    className="absolute right-4 bottom-4"
                                >
                                    {togglePassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 640 512"
                                        >
                                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5 my-6">
                            <Label htmlFor="password" className="text-base">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <TextInput
                                    type={
                                        confirmTogglePassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="**********"
                                    name="confirmPassword"
                                    className="py-4 text-base md:text-lg"
                                    register={register}
                                    errors={errors}
                                    onChange={handleChange}
                                />

                                <div
                                    onClick={() => {
                                        setConfirmTogglePassword(
                                            !confirmTogglePassword
                                        );
                                    }}
                                    className="absolute right-4 bottom-4"
                                >
                                    {confirmTogglePassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 576 512"
                                        >
                                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 640 512"
                                        >
                                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="py-6 px-12 text-base bg-teal-600 hover:bg-teal-600 md:text-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg
                                    className="w-5 h-5 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                    <div className="lg:w-[80%] flex space-x-1 mt-4 text-base md:text-lg">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="underline">
                            Sign in
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 ">
                    <img
                        src={AuthImage}
                        alt="ashfbh"
                        className="h-full hidden lg:block w-full rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
