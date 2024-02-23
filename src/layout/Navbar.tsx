import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { getUserDetails } from "@/services/onboarding";
import { UserStore } from "@/store/userStore";

const Navbar = ({ children }: { children: JSX.Element }) => {
    const token = Cookies.get("token");
    const authenticated = !!token;
    const navigate = useNavigate();
    const { setUser, user } = UserStore();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { status, data } = await getUserDetails();
                if (status !== 200) {
                    return;
                }
                setUser(data);
            } catch (error) {
                console.log("Unable to fetch user details", error);
            }
        };
        fetchUserDetails();
    }, []);

    const hanldeLogOut = () => {
        Cookies.remove("token");
        navigate("/login", { replace: true });
    };
    return (
        <>
            <nav className="bg-white">
                <div className="mx-auto w-[95%] max-w-[1600px] my-4 md:w-[90%]">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link
                                to={"/"}
                                className="flex items-center gap-2 text-teal-600"
                            >
                                <svg
                                    className="h-8"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="hidden sm:flex">
                                    Scribbles
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 sm:gap-10 md:gap-12">
                            <nav aria-label="Global" className="">
                                <ul className="flex items-center gap-6 text-sm">
                                    <Link
                                        to={"/new-blog"}
                                        className="text-gray-500 transition flex gap-1 mr-3 items-center hover:text-gray-500/75"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            height={20}
                                            width={20}
                                        >
                                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                        </svg>
                                        <span className="hidden sm:flex">
                                            Write
                                        </span>
                                    </Link>
                                </ul>
                            </nav>
                            <div className="flex items-center gap-4">
                                {!authenticated ? (
                                    <div className="flex gap-4">
                                        <Link
                                            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                            to={"/login"}
                                        >
                                            Login
                                        </Link>

                                        <div className="flex">
                                            <Link
                                                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                                                to={"/register"}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                className="cursor-pointer"
                                                asChild
                                            >
                                                <Avatar className="ml-[-2rem]">
                                                    <AvatarImage
                                                        src={
                                                            "https://scribbles-backend.onrender.com/public/img/" +
                                                            user?.photo
                                                        }
                                                        crossOrigin="anonymous"
                                                    />
                                                    <AvatarFallback>
                                                        {user?.username
                                                            .split(" ")[0]
                                                            .slice(0, 1)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[200px] text-base">
                                                <DropdownMenuLabel className="text-xl text-[#00897B]">
                                                    My Account
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <Link to={"/profile"}>
                                                        <DropdownMenuItem className="flex text-[#00897B] text-base gap-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                                height={30}
                                                                width={30}
                                                                fill="#00897B"
                                                            >
                                                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                            </svg>
                                                            <span>Profile</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link to={"/library"}>
                                                        <DropdownMenuItem className="flex text-base text-[#00897B] gap-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                                height={30}
                                                                width={30}
                                                                fill="#00897B"
                                                            >
                                                                <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                                            </svg>
                                                            <span>Library</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link
                                                        to={"/archived-blogs"}
                                                    >
                                                        <DropdownMenuItem className="flex text-[#00897B] text-base gap-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 384 512"
                                                                height={30}
                                                                width={30}
                                                                fill="#00897B"
                                                            >
                                                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                                                            </svg>{" "}
                                                            <span>
                                                                Archived
                                                            </span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="flex text-base text-[#00897B] gap-4"
                                                    onClick={hanldeLogOut}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        height={30}
                                                        width={30}
                                                        fill="#00897B"
                                                    >
                                                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                                                    </svg>{" "}
                                                    <span> Log out</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
};

export default Navbar;
