import { Label } from "@radix-ui/react-label";
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "./ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { uploadBlog } from "@/services/author";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BlogContent } from "@/interfaces/blog";
import { cloudinaryConfig } from "@/utils/cloudinary";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { categories } from "@/utils/category";
import { generateBlogContent } from "@/services/blogs";

const Editor = () => {
    const [blogContent, setBlogContent] = useState<BlogContent>({
        summary: "",
        title: "",
        content: "",
        coverImage: "",
        category: "",
    });
    const [coverImageFile, setCoverImageFile] = useState<any>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const quill = useRef<any>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const resizeFile = (file: any) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                2000,
                1333,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const handleCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const image = await resizeFile(file);
        setCoverImageFile(image);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setBlogContent((prev) => ({
            ...prev,
            [inputField]: value,
        }));
    };

    const handleCoverImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", coverImageFile);
            formData.append("upload_preset", cloudinaryConfig.uploadPreset);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            const secureUrl = response.data.secure_url;
            setBlogContent((prev) => ({
                ...prev,
                coverImage: secureUrl,
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const generateContent = async () => {
        if (blogContent.title.trim() === "") {
            toast.error(
                "Please provide the title of the blog you want to generate it's content "
            );
            return;
        }
        try {
            setIsLoading(true);

            const { status, message, data } = await generateBlogContent(
                blogContent.title
            );
            if (status !== 200) {
                toast.error(message);
                setIsLoading(false);
                return;
            }
            toast.success(message);
            setIsLoading(false);
            setBlogContent((prev) => ({
                ...prev,
                content: data,
            }));
        } catch (error) {
            toast.error(
                "Unable to generate blog content. Please try again later"
            );
            setIsLoading(false);
            return;
        }
    };

    const handler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !blogContent.category ||
            !blogContent.content ||
            !blogContent.summary ||
            !blogContent.title
        ) {
            return;
        }
        try {
            setIsLoading(true);
            await handleCoverImageUpload();
            const { status, message } = await uploadBlog(blogContent);
            if (status !== 200) {
                toast.error(message);
                setIsLoading(false);
                return;
            }
            toast.success(message);
            setIsLoading(false);
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error(
                "Unable to process blog creation. Kindly check your intenet connection and try again!"
            );
            setIsLoading(false);
            return;
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input?.files?.[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    const imageUrl = reader.result;
                    const quillEditor = quill.current?.getEditor();

                    const range = quillEditor?.getSelection(true);
                    if (range && imageUrl) {
                        quillEditor?.insertEmbed(
                            range.index,
                            "image",
                            imageUrl,
                            "user"
                        );
                    }
                };

                reader.readAsDataURL(file);
            }
        };
    }, []);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [2, 3, 4, false] }],
                    ["bold", "italic", "underline", "blockquote"],
                    [{ color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            clipboard: {
                matchVisual: true,
            },
        }),
        [imageHandler]
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
    ];

    return (
        <>
            <div className="mx-auto w-[95%] md:w-[90%] py-4 max-w-[1600px]">
                <form action="" onSubmit={handler}>
                    <div className="grid w-full my-4 items-center gap-1.5">
                        <Label className="text-xl font-semibold mb-1">
                            Title
                        </Label>
                        <Input
                            type="text"
                            name="title"
                            className="outline-none"
                            onChange={(e) => handleInputChange(e, "title")}
                        />
                    </div>
                    <div className="grid w-full my-4 items-center gap-1.5">
                        <Label className="text-xl font-semibold mb-1">
                            Summary
                        </Label>
                        <Input
                            type="text"
                            name="summary"
                            className="outline-none"
                            onChange={(e) => handleInputChange(e, "summary")}
                        />
                    </div>
                    <div className="grid w-full my-4 items-center gap-1.5">
                        <Label className="text-xl font-semibold mb-1">
                            Cover Image
                        </Label>
                        <Input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            className="outline-none text-base items-center border h-12 mr-2"
                            onChange={handleCoverImage}
                        />
                    </div>
                    <div className="grid w-full my-4 items-center gap-1.5">
                        <Label className="text-xl font-semibold mb-1">
                            Category
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between"
                                >
                                    {value
                                        ? categories.find(
                                              (category) =>
                                                  category.value === value
                                          )?.label
                                        : "Select category..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Command>
                                    <CommandInput placeholder="Search category..." />
                                    <CommandEmpty>
                                        No category found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((category) => (
                                            <CommandItem
                                                key={category.value}
                                                value={category.value}
                                                onSelect={(currentValue) => {
                                                    setValue(
                                                        currentValue === value
                                                            ? ""
                                                            : currentValue
                                                    );
                                                    setBlogContent((prev) => ({
                                                        ...prev,
                                                        category: currentValue,
                                                    }));
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === category.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {category.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid w-full my-4 items-center gap-1.5">
                        <Label className="text-xl font-semibold mb-1">
                            Content
                        </Label>
                        <QuillEditor
                            ref={(el) => (quill.current = el)}
                            className="h-[60vh]"
                            theme="snow"
                            value={blogContent.content}
                            formats={formats}
                            modules={modules}
                            onChange={(value) =>
                                setBlogContent((prev) => ({
                                    ...prev,
                                    content: value,
                                }))
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-16 text-base md:text-xl rounded mt-[4.5rem] sm:mt-12"
                        disabled={isLoading}
                    >
                        {isLoading ? "Publishing" : "Publish"}
                    </button>
                </form>
                <div className="grid my-4 items-center gap-1.5">
                    <button
                        type="button"
                        className="text-white bg-teal-600 hover:bg-teal-600 w-fit sm:fixed sm:bottom-4 sm:right-6 font-bold py-2 px-4 rounded"
                        onClick={generateContent}
                        disabled={isLoading}
                    >
                        {isLoading ? "Generating Content" : "Generate Content"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Editor;
