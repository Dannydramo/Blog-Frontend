import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AuthImage from "../../assets/auth-image.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { ForgotPasswordProps } from "@/interfaces/onboarding";
import { forgotPasswordValidationSchema } from "@/validators/onboarding";
import { forgotPassword } from "@/services/onboarding";

const ForgotPassword = () => {
    const [formData, setFormdata] = useState<ForgotPasswordProps>({
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordProps>({
        resolver: yupResolver(forgotPasswordValidationSchema),
    });

    const handleChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormdata({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Function to submit form
    const onSubmit = async () => {
        setIsLoading(true);

        try {
            const { status, message } = await forgotPassword(formData);
            if (status !== 200) {
                toast.error(message);
                setIsLoading(false);
                return;
            }
            setMessage(message);
            setIsLoading(false);
            return;
        } catch (err) {
            console.log(err);
            toast.error(
                "Unable to process form submission. Kindly check all your connection and try again"
            );
            setIsLoading(false);
            return;
        }
    };
    return (
        <div className="w-[90%] lg:w-[90%] max-w-[1600px] sm:w-[70%] md:w-[60%] mx-auto">
            <div className="py-4 lg:py-8 lg:space-x-6 lg:flex  lg:min-h-screen lg:justify-between">
                <div className="w-full lg:w-1/2 lg:flex lg:justify-center lg:items-center lg:flex-col">
                    <h1 className="font-bold text-teal-600 lg:w-[80%] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 mb-6">
                        Scribbles
                    </h1>
                    <h2 className="lg:w-[80%] text-teal-600 mt-8 mb-3 text-4xl sm:text-5xl font-bold">
                        Forgot your passowrd?
                    </h2>
                    {!message && (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="lg:w-[80%]"
                        >
                            <div className="grid w-full my-6 max-w-sm items-center gap-1.5">
                                <Label htmlFor="email" className="text-base">
                                    Email
                                </Label>
                                <TextInput
                                    type="email"
                                    placeholder="Email"
                                    className="py-4 text-base md:text-lg outline-none"
                                    name="email"
                                    register={register}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="lg:w-[80%] flex space-x-1 my-4 text-base md:text-lg">
                                <p>Already have an account?</p>
                                <Link to={"/login"} className="underline">
                                    Sign in
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                className="py-7 px-16 text-base bg-teal-600 hover:bg-teal-600 md:text-xl"
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
                                    "Forget Password"
                                )}
                            </Button>
                        </form>
                    )}
                    {message && <p className="mt-4">{message}</p>}
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

export default ForgotPassword;
